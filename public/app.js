const form = document.getElementById('lookup-form');
const input = document.getElementById('word');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const word = input.value.trim();
  if (!word) return;

  result.innerHTML = `<p>Searching for <b>${word}</b>...</p>`;

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (!res.ok) {
      result.innerHTML = `<p>No results found for "${word}".</p>`;
      return;
    }

    const entry = data[0];
    const phonetic = entry.phonetic ? `<p><i>${entry.phonetic}</i></p>` : '';
    const meanings = entry.meanings
      .map(m => `
        <div>
          <strong>${m.partOfSpeech}</strong>
          <ul>${m.definitions.slice(0,2).map(d => `<li>${d.definition}</li>`).join('')}</ul>
        </div>
      `)
      .join('');

    result.innerHTML = `<h2>${entry.word}</h2>${phonetic}${meanings}`;
  } catch {
    result.innerHTML = `<p>Error fetching definition. Please try again.</p>`;
  }
});
