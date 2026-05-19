"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  deleteRsvpResponse,
  updateRsvpResponse,
  type AdminActionState,
} from "@/app/admin/responses/actions";
import type { AttendanceStatus, RSVPResponseRow } from "@/types/rsvp";

type ResponsesDashboardProps = {
  responses: RSVPResponseRow[];
};

type FilterValue = "all" | "attending" | "with_partner" | "with_children" | "declined";

const filters: Array<{ value: FilterValue; label: string }> = [
  { value: "all", label: "Все" },
  { value: "attending", label: "Придут" },
  { value: "with_partner", label: "С парой" },
  { value: "with_children", label: "С детьми" },
  { value: "declined", label: "Отказались" },
];

const statusLabels: Record<AttendanceStatus, string> = {
  alone: "Придет один / одна",
  with_partner: "Будет с парой",
  declined: "Не сможет прийти",
};

const emptyActionState: AdminActionState = {
  error: null,
  success: null,
};

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getAdultsCount(response: RSVPResponseRow) {
  if (response.attendance_status === "declined") {
    return 0;
  }

  return response.attendance_status === "with_partner" ? 2 : 1;
}

function getChildrenCount(response: RSVPResponseRow) {
  if (response.attendance_status === "declined" || !response.has_children) {
    return 0;
  }

  return response.children_count ?? 0;
}

function matchesFilter(response: RSVPResponseRow, filter: FilterValue) {
  switch (filter) {
    case "attending":
      return response.attendance_status !== "declined";
    case "with_partner":
      return response.attendance_status === "with_partner";
    case "with_children":
      return response.attendance_status !== "declined" && getChildrenCount(response) > 0;
    case "declined":
      return response.attendance_status === "declined";
    default:
      return true;
  }
}

function matchesSearch(response: RSVPResponseRow, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    response.guest_name,
    response.partner_name,
    response.children_info,
    response.comment,
    statusLabels[response.attendance_status],
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function ResponsesDashboard({ responses }: ResponsesDashboardProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [editing, setEditing] = useState<RSVPResponseRow | null>(null);
  const [deleting, setDeleting] = useState<RSVPResponseRow | null>(null);
  const [editStatus, setEditStatus] = useState<AttendanceStatus>("alone");
  const [editHasChildren, setEditHasChildren] = useState(false);
  const [actionState, setActionState] = useState<AdminActionState>(emptyActionState);
  const [pendingAction, setPendingAction] = useState<"edit" | "delete" | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const stats = useMemo(() => {
    const adults = responses.reduce((sum, response) => sum + getAdultsCount(response), 0);
    const children = responses.reduce((sum, response) => sum + getChildrenCount(response), 0);
    const declined = responses.filter((response) => response.attendance_status === "declined").length;

    return {
      adults,
      children,
      total: adults + children,
      declined,
    };
  }, [responses]);

  const filteredResponses = useMemo(
    () =>
      responses.filter(
        (response) => matchesFilter(response, filter) && matchesSearch(response, normalizedQuery),
      ),
    [filter, normalizedQuery, responses],
  );

  const openEdit = (response: RSVPResponseRow) => {
    setActionState(emptyActionState);
    setEditing(response);
    setEditStatus(response.attendance_status);
    setEditHasChildren(response.attendance_status !== "declined" && Boolean(response.has_children));
  };

  const openDelete = (response: RSVPResponseRow) => {
    setActionState(emptyActionState);
    setDeleting(response);
  };

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPendingAction("edit");
    setActionState(emptyActionState);

    const nextState = await updateRsvpResponse(new FormData(event.currentTarget));
    setActionState(nextState);
    setPendingAction(null);

    if (nextState.success) {
      setEditing(null);
      router.refresh();
    }
  };

  const handleDeleteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPendingAction("delete");
    setActionState(emptyActionState);

    const nextState = await deleteRsvpResponse(new FormData(event.currentTarget));
    setActionState(nextState);
    setPendingAction(null);

    if (nextState.success) {
      setDeleting(null);
      router.refresh();
    }
  };

  return (
    <section className="admin-dashboard" aria-label="Ответы гостей">
      <div className="admin-stats" aria-label="Статистика RSVP">
        <article>
          <span>Взрослых</span>
          <strong>{stats.adults}</strong>
        </article>
        <article>
          <span>Детей</span>
          <strong>{stats.children}</strong>
        </article>
        <article>
          <span>Всего гостей</span>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <span>Отказались</span>
          <strong>{stats.declined}</strong>
        </article>
      </div>

      <div className="admin-toolbar">
        <label className="admin-search">
          <span>Поиск</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Имя, пара, дети, комментарий"
          />
        </label>

        <div className="admin-filters" aria-label="Фильтры ответов">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              className={filter === item.value ? "is-active" : undefined}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-shell">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <caption>Список ответов гостей</caption>
            <thead>
              <tr>
                <th>Гость</th>
                <th>Статус</th>
                <th>Пара</th>
                <th>Дети</th>
                <th>Всего</th>
                <th>Комментарий</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredResponses.length > 0 ? (
                filteredResponses.map((response) => (
                  <tr key={response.id}>
                    <td>
                      <strong>{response.guest_name}</strong>
                    </td>
                    <td>
                      <span className={`admin-status admin-status--${response.attendance_status}`}>
                        {statusLabels[response.attendance_status]}
                      </span>
                    </td>
                    <td>{response.partner_name ?? "-"}</td>
                    <td>
                      {getChildrenCount(response) > 0
                        ? `${getChildrenCount(response)}: ${response.children_info ?? "-"}`
                        : "-"}
                    </td>
                    <td>{getAdultsCount(response) + getChildrenCount(response)}</td>
                    <td>{response.comment ?? "-"}</td>
                    <td>{formatDate(response.created_at)}</td>
                    <td>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => openEdit(response)}>
                          Изменить
                        </button>
                        <button
                          type="button"
                          className="admin-danger-button"
                          onClick={() => openDelete(response)}
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="admin-empty-cell" colSpan={8}>
                    {responses.length === 0
                      ? "Ответов пока нет."
                      : "По выбранным фильтрам ничего не найдено."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing ? (
        <div className="admin-modal-backdrop" role="presentation">
          <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="edit-title">
            <header>
              <h2 id="edit-title">Редактировать ответ</h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Закрыть">
                Закрыть
              </button>
            </header>

            <form className="admin-edit-form" onSubmit={handleEditSubmit}>
              <input type="hidden" name="id" value={editing.id} />

              <label>
                <span>Имя и фамилия</span>
                <input name="guestName" type="text" defaultValue={editing.guest_name} required />
              </label>

              <label>
                <span>Статус присутствия</span>
                <select
                  name="attendanceStatus"
                  value={editStatus}
                  onChange={(event) => setEditStatus(event.target.value as AttendanceStatus)}
                >
                  <option value="alone">Да, придет один / одна</option>
                  <option value="with_partner">Да, будет с парой</option>
                  <option value="declined">К сожалению, не сможет</option>
                </select>
              </label>

              {editStatus === "with_partner" ? (
                <label>
                  <span>Имя и фамилия пары</span>
                  <input
                    name="partnerName"
                    type="text"
                    defaultValue={editing.partner_name ?? ""}
                    required
                  />
                </label>
              ) : null}

              {editStatus !== "declined" ? (
                <label className="admin-checkbox">
                  <input
                    name="hasChildren"
                    type="checkbox"
                    checked={editHasChildren}
                    onChange={(event) => setEditHasChildren(event.target.checked)}
                  />
                  <span>Будут дети</span>
                </label>
              ) : null}

              {editStatus !== "declined" && editHasChildren ? (
                <>
                  <label>
                    <span>Количество детей</span>
                    <input
                      name="childrenCount"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      defaultValue={editing.children_count ?? 1}
                      required
                    />
                  </label>

                  <label>
                    <span>Имена и возраст детей</span>
                    <textarea name="childrenInfo" rows={3} defaultValue={editing.children_info ?? ""} />
                  </label>
                </>
              ) : null}

              <label>
                <span>Комментарий</span>
                <textarea name="comment" rows={3} defaultValue={editing.comment ?? ""} />
              </label>

              {actionState.error ? <p className="admin-action-error">{actionState.error}</p> : null}

              <div className="admin-modal-actions">
                <button type="button" onClick={() => setEditing(null)}>
                  Отмена
                </button>
                <button className="admin-primary-button" type="submit" disabled={pendingAction === "edit"}>
                  {pendingAction === "edit" ? "Сохраняем..." : "Сохранить"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}

      {deleting ? (
        <div className="admin-modal-backdrop" role="presentation">
          <section
            className="admin-modal admin-modal--compact"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
          >
            <header>
              <h2 id="delete-title">Удалить ответ?</h2>
              <button type="button" onClick={() => setDeleting(null)} aria-label="Закрыть">
                Закрыть
              </button>
            </header>
            <p>
              Ответ гостя <strong>{deleting.guest_name}</strong> будет удален без восстановления.
            </p>

            <form onSubmit={handleDeleteSubmit}>
              <input type="hidden" name="id" value={deleting.id} />
              {actionState.error ? <p className="admin-action-error">{actionState.error}</p> : null}
              <div className="admin-modal-actions">
                <button type="button" onClick={() => setDeleting(null)}>
                  Отмена
                </button>
                <button
                  className="admin-danger-button admin-danger-button--solid"
                  type="submit"
                  disabled={pendingAction === "delete"}
                >
                  {pendingAction === "delete" ? "Удаляем..." : "Удалить"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </section>
  );
}
