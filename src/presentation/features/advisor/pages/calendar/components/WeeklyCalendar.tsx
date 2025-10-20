import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDateFormatter } from "@react-aria/i18n";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: "meeting" | "call" | "task" | "reminder";
  advisor?: string;
}

interface WeeklyCalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onCreateEvent?: () => void;
  showCreateButton?: boolean;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  events,
  onEventClick,
  onCreateEvent,
  showCreateButton = false,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = React.useState<Date>(() => {
    const today = new Date();
    const day = today.getDay(); // 0 is Sunday
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    return new Date(today.setDate(diff));
  });

  const dateFormatter = useDateFormatter({ dateStyle: "medium" });
  const weekDayFormatter = useDateFormatter({ weekday: "long" });

  // Generate days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + i);
    return {
      date,
      dayName: weekDayFormatter.format(date),
      dayNumber: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      isToday: isToday(date),
    };
  });

  // Generate hours (8:00 AM to 8:00 PM)
  const hours = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8; // Start at 8 AM
    return {
      hour,
      label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`,
    };
  });

  function isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    setCurrentWeekStart(new Date(today.setDate(diff)));
  };

  // Get events for a specific day and hour
  const getEventsForTimeSlot = (day: (typeof weekDays)[0], hour: number) => {
    return events?.filter((event) => {
      const eventDate = new Date(event.date);
      const eventHour = parseInt(event.time.split(":")[0]);

      return (
        eventDate.getDate() === day.date.getDate() &&
        eventDate.getMonth() === day.date.getMonth() &&
        eventDate.getFullYear() === day.date.getFullYear() &&
        eventHour === hour
      );
    });
  };

  // Get color based on event type
  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "call":
        return "bg-green-100 text-green-800 border-green-300";
      case "task":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "reminder":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Format the current week display
  const formatWeekDisplay = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(currentWeekStart.getDate() + 6);

    if (currentWeekStart.getMonth() === endDate.getMonth()) {
      return `${currentWeekStart.getDate()} - ${endDate.getDate()} ${new Intl.DateTimeFormat(
        "es-ES",
        { month: "long" }
      ).format(currentWeekStart)} ${currentWeekStart.getFullYear()}`;
    } else {
      return `${currentWeekStart.getDate()} ${new Intl.DateTimeFormat("es-ES", {
        month: "short",
      }).format(
        currentWeekStart
      )} - ${endDate.getDate()} ${new Intl.DateTimeFormat("es-ES", {
        month: "long",
      }).format(endDate)} ${currentWeekStart.getFullYear()}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="flat"
            color="default"
            onPress={goToPreviousWeek}
            startContent={<Icon icon="lucide:chevron-left" />}
          >
            Semana Anterior
          </Button>
          <Button variant="light" color="default" onPress={goToToday}>
            Hoy
          </Button>
          <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium">
            {formatWeekDisplay()}
          </span>
          <Button
            variant="flat"
            color="default"
            onPress={goToNextWeek}
            endContent={<Icon icon="lucide:chevron-right" />}
          >
            Siguiente Semana
          </Button>
        </div>

        {showCreateButton && onCreateEvent && (
          <Button
            color="primary"
            onPress={onCreateEvent}
            startContent={<Icon icon="lucide:plus" />}
          >
            Crear Evento
          </Button>
        )}
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-3 text-center font-medium text-gray-500 border-r border-gray-200">
              Hora
            </div>
            {weekDays?.map((day, index) => (
              <div
                key={index}
                className={`p-3 text-center font-medium ${
                  day.isToday ? "bg-blue-50 text-blue-700" : "text-gray-700"
                } ${index < 6 ? "border-r border-gray-200" : ""}`}
              >
                <div>{day.dayName}</div>
                <div
                  className={`text-lg ${
                    day.isToday ? "text-blue-700 font-bold" : ""
                  }`}
                >
                  {day.dayNumber}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8">
            {hours?.map((timeSlot, timeIndex) => (
              <React.Fragment key={timeIndex}>
                <div className="p-2 border-r border-b border-gray-200 text-center text-sm text-gray-500">
                  {timeSlot.label}
                </div>

                {weekDays?.map((day, dayIndex) => (
                  <div
                    key={`${timeIndex}-${dayIndex}`}
                    className={`p-1 min-h-[80px] relative ${
                      day.isToday ? "bg-blue-50/30" : ""
                    } ${dayIndex < 6 ? "border-r border-gray-200" : ""} ${
                      timeIndex < hours.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    {getEventsForTimeSlot(day, timeSlot.hour)?.map(
                      (event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`p-1 mb-1 text-xs rounded border ${getEventColor(
                            event.type
                          )} cursor-pointer`}
                          onClick={() => onEventClick(event)}
                        >
                          <div className="font-medium truncate">
                            {event.title}
                          </div>
                          <div className="text-xs opacity-75">{event.time}</div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default WeeklyCalendar;
