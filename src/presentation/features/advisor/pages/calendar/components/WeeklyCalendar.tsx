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
  // Información adicional de la tarea
  task?: any;
  lead?: any;
  priority?: string;
  status?: string;
  notes?: string;
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

  const weekDayFormatter = useDateFormatter({ weekday: "long" });

  // Debug log para ver todos los eventos recibidos
  console.log("WeeklyCalendar - Events received:", events);
  console.log("WeeklyCalendar - Events count:", events?.length);
  console.log("WeeklyCalendar - Current week start:", currentWeekStart.toDateString());

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
    const filteredEvents = events?.filter((event) => {
      // Crear fechas locales para comparación
      const eventDate = new Date(event.date + 'T00:00:00'); // Asegurar que es fecha local
      const dayDate = new Date(day.date);
      
      // Normalizar ambas fechas al inicio del día para comparación
      eventDate.setHours(0, 0, 0, 0);
      dayDate.setHours(0, 0, 0, 0);
      
      const eventHour = parseInt(event.time.split(":")[0]);

      const dateMatches = eventDate.getTime() === dayDate.getTime();
      const hourMatches = eventHour === hour;
      const matches = dateMatches && hourMatches;

      // Debug logs detallados
      console.log(`Comparing event: ${event.title}`);
      console.log(`Event date: ${event.date} -> ${eventDate.toDateString()}`);
      console.log(`Day date: ${day.date.toDateString()}`);
      console.log(`Event hour: ${eventHour}, Target hour: ${hour}`);
      console.log(`Date matches: ${dateMatches}, Hour matches: ${hourMatches}, Final match: ${matches}`);

      // Debug log para eventos que coinciden
      if (matches) {
        console.log(`✅ Event found for ${day.date.toDateString()} at ${hour}:00:`, event);
      }

      return matches;
    });

    // Debug log para el slot de tiempo
    if (filteredEvents && filteredEvents.length > 0) {
      console.log(`Events for ${day.date.toDateString()} at ${hour}:00:`, filteredEvents);
    }

    return filteredEvents;
  };

  // Get color based on event type, priority and status
  const getEventColor = (event: Event) => {
    // Debug log para verificar el evento y sus propiedades
    console.log(`Getting color for event: ${event.title}`, {
      type: event.type,
      priority: event.priority,
      status: event.status
    });
    
    // Primero verificar prioridad para colores más importantes
    if (event.priority === 'HIGH' || event.priority === 'ALTA') {
      console.log(`High priority event: ${event.title} -> RED`);
      return "bg-red-100 text-red-800 border-red-400 border-2";
    }
    
    if (event.priority === 'LOW' || event.priority === 'BAJA') {
      console.log(`Low priority event: ${event.title} -> GREEN`);
      return "bg-green-100 text-green-800 border-green-300";
    }
    
    if (event.priority === 'AVERAGE' || event.priority === 'MEDIA' || event.priority === 'MEDIUM') {
      console.log(`Medium priority event: ${event.title} -> ORANGE`);
      return "bg-orange-100 text-orange-800 border-orange-300";
    }
    
    // Luego verificar estado
    if (event.status === 'COMPLETE' || event.status === 'COMPLETADA' || event.status === 'COMPLETED') {
      console.log(`Completed event: ${event.title} -> GREEN`);
      return "bg-green-100 text-green-800 border-green-300";
    }
    
    if (event.status === 'CLOSED' || event.status === 'CERRADA') {
      console.log(`Closed event: ${event.title} -> GRAY`);
      return "bg-gray-100 text-gray-800 border-gray-300";
    }
    
    if (event.status === 'PROGRESS' || event.status === 'EN_PROGRESO' || event.status === 'IN_PROGRESS') {
      console.log(`In progress event: ${event.title} -> BLUE`);
      return "bg-blue-100 text-blue-800 border-blue-300";
    }
    
    if (event.status === 'OPEN' || event.status === 'PENDIENTE' || event.status === 'OPENED') {
      console.log(`Open/Pending event: ${event.title} -> YELLOW`);
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
    
    // Finalmente, colores por tipo de evento
    let colorClass = "";
    switch (event.type) {
      case "meeting":
        colorClass = "bg-blue-100 text-blue-800 border-blue-300";
        break;
      case "call":
        colorClass = "bg-green-100 text-green-800 border-green-300";
        break;
      case "task":
        colorClass = "bg-amber-100 text-amber-800 border-amber-300";
        break;
      case "reminder":
        colorClass = "bg-purple-100 text-purple-800 border-purple-300";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-800 border-gray-300";
        break;
    }
    
    console.log(`Event type color for ${event.title} (${event.type}): ${colorClass}`);
    return colorClass;
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
                            event
                          )} cursor-pointer hover:shadow-md transition-shadow`}
                          onClick={() => onEventClick(event)}
                          title={`${event.title} - ${event.time} - Prioridad: ${event.priority || 'N/A'} - Estado: ${event.status || 'N/A'}`}
                        >
                          <div className="font-medium truncate">
                            {event.title}
                          </div>
                          <div className="text-xs opacity-75 flex justify-between items-center">
                            <span>{event.time}</span>
                            {event.priority && (
                              <span className={`px-1 rounded text-xs ${
                                event.priority === 'ALTA' ? 'bg-red-100 text-red-700' :
                                event.priority === 'MEDIA' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {event.priority}
                              </span>
                            )}
                          </div>
                          {event.status && (
                            <div className="text-xs opacity-60 truncate">
                              Estado: {event.status}
                            </div>
                          )}
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
