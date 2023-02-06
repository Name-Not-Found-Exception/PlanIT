

      async function submit() {
       

        const formData = new FormData(document.getElementById("event-form"));

        const response = await fetch('/api/events', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log('Event created successfully');
        } else {
          console.error('Failed to create event');
        }
      }