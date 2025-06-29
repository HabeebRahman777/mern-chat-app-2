export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

export function formatDateHeader(dateString){
  const today = new Date();
  const messageDate = new Date(dateString);
  
  const isToday = messageDate.toDateString() === today.toDateString();
  const isYesterday =
    new Date(today.setDate(today.getDate() - 1)).toDateString() === messageDate.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";
  return messageDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};
