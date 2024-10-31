export const DateExtension = {
    name: 'Date',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'ext_date' || trace.payload.name === 'ext_date',
    render: ({ trace, element }) => {
      const formContainer = document.createElement('form');
      
      // Sets the minimum and maximum date range
      let currentDate = new Date();
      let minDate = new Date();
      minDate.setMonth(currentDate.getMonth() - 1);
      let maxDate = new Date();
      maxDate.setMonth(currentDate.getMonth() + 2);
      
      // Convert dates to strings compatible with input[type="datetime-local"]
      let minDateString = minDate.toISOString().slice(0, 16);
      let maxDateString = maxDate.toISOString().slice(0, 16);
  
      formContainer.innerHTML = `
            <style>
              label {
                font-size: 0.8em;
                color: #888;
              }
              .meeting input {
                background: transparent;
                border: none;
                padding: 2px;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                font: normal 14px sans-serif;
                outline: none;
                margin: 5px 0;
              }
              .submit {
                background: linear-gradient(to right, #2e6ee1, #2e7ff1);
                color: white;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
              }
            </style>
            <label for="date">Select your date/time</label><br>
            <div class="meeting"><input type="datetime-local" id="meeting" name="meeting" min="${minDateString}" max="${maxDateString}" /></div><br>
            <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
            `;
  
      // Event listener for submission to capture selected date and time
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const datetime = formContainer.querySelector('#meeting').value;
        const [date, time] = datetime.split('T');
        
        // Communicate the selected date and time to Voiceflow
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: { date: date, time: time },
        });
      });
      
      element.appendChild(formContainer);
    },
  };
  