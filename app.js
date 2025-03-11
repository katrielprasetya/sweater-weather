/**
 * Data
 */
const daily = {
    time: [
      '2025-03-11',
      '2025-03-12',
      '2025-03-13',
      '2025-03-14',
      '2025-03-15',
      '2025-03-16',
      '2025-03-17',
    ],
    temperature_2m: [25.4, 27.2, 28.9, 29.5, 30.4, 30.7, 30.8],
  };
  
  /**
   * DOM Selector
   */
  const days = document.querySelector('#days');
  
  /**
   * Functions
   */
  
  const formattedDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    const newFormat = new Date(date);
    return newFormat.toLocaleDateString('id-ID', options);
  };
  
  days.innerHTML = '';
  
  for (let i = 0; i < daily.time.length; i++) {
    days.innerHTML += `
      <div class="col-12 col-md-3">
        <div class="card text-bg-light mb-3">
          <div class="card-body">
            <h5 class="card-title">${daily.temperature_2m[i]}</h5>
            <p class="card-text">${formattedDate(daily.time[i])}</p>
          </div>
        </div>
      </div>
    `;
  }
  