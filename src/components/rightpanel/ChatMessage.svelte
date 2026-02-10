<script>
  export let message;
</script>

<div class="flex gap-3 {message.isOwn ? 'flex-row-reverse' : ''} animate-fade-in">
  <div class="w-9 h-9 rounded-full bg-gradient-to-br {message.user.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg">
    {message.user.initials}
  </div>
  <div class="flex-1 min-w-0 {message.isOwn ? 'text-right' : ''}">
    <div class="flex items-center gap-2 mb-1 {message.isOwn ? 'flex-row-reverse' : ''}">
      <span class="font-semibold text-sm text-slate-200">{message.user.name}</span>
      <span class="text-xs text-slate-500">{message.time}</span>
    </div>
    <div class="inline-block rounded-2xl px-4 py-2.5 text-sm text-left max-w-[75%] {message.isOwn
      ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-br-md'
      : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'}">
      {message.text}
    </div>
  </div>
</div>
