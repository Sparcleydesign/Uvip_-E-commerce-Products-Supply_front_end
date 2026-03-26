export const dashboardData = {
  store: {
    name: "My Fashion Store",
    url: "myshop.custom.com",
    platform: "OpenCart 4.x",
    logo: "opencart",
    status: "connected",
    lastSync: "2 mins ago"
  },
  stats: [
    { num: "5", label: "Active Suppliers", change: "+1 this week", color: "text-sage-dark" },
    { num: "2,847", label: "Total Products", change: "+28 today", color: "text-gray-900" },
    { num: "142", label: "Updated Today", change: "via cron 02:00", color: "text-blue-500" },
    { num: "7", label: "Pending Approval", change: "Auto-categories", color: "text-amber-500" }
  ],
  suppliers: [
    { name: "Global Brands XML", format: "XML", lastRun: "10 mins ago", status: "green" },
    { name: "EU Distribution CSV", format: "CSV", lastRun: "2 hours ago", status: "green" },
    { name: "TechGear API", format: "API", lastRun: "Yesterday", status: "yellow" },
    { name: "FashionHub Feeds", format: "XML", lastRun: "Failed", status: "red" }
  ],
  logs: [
    { time: "09:42", type: "ok", message: "Successfully synced 124 products from Global Brands." },
    { time: "09:15", type: "info", message: "New duplicates detected in Technology category." },
    { time: "08:30", type: "err", message: "Connection timeout with FashionHub API." },
    { time: "07:45", type: "warn", message: "Price increase > 20% detected for SQ-912 SKU." },
    { time: "06:00", type: "ok", message: "Cronjob 'Daily Sync' completed successfully." },
    { time: "23:15", type: "info", message: "System maintenance completed." }
  ]
};
