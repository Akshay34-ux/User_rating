document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const result = document.getElementById("rating-result");
    const feedbackText = document.getElementById("feedback-text");
    const userName = document.getElementById("user-name");
    const submitButton = document.getElementById("submit-feedback");
    const feedbackList = document.getElementById("other-feedbacks");
  
    let rating = 0;
  
    // Reset the stars (remove highlighting)
    function resetStars() {
      stars.forEach((star) => {
        star.classList.remove('highlight');
      });
    }
  
    // Highlight stars up to the clicked/hovered rating value
    function highlightStars(ratingValue) {
      stars.forEach((star) => {
        if (star.dataset.value <= ratingValue) {
          star.classList.add('highlight');
        }
      });
    }
  
    // Mouseover: Highlight stars dynamically
    stars.forEach((star) => {
      star.addEventListener("mouseover", () => {
        resetStars();
        highlightStars(star.dataset.value);
      });
  
      // Click: Set the rating and display result
      star.addEventListener("click", () => {
        rating = star.dataset.value;
        result.textContent = `You rated this ${rating} star${rating > 1 ? "s" : ""}!`;
      });
  
      // Mouseout: Reset stars to current rating or unhighlight
      star.addEventListener("mouseout", () => {
        resetStars();
        if (rating > 0) {
          highlightStars(rating);
        }
      });
    });
  
    // Handle feedback submission
    submitButton.addEventListener("click", () => {
      const name = userName.value.trim();
      if (rating > 0 && feedbackText.value.trim() !== "" && name !== "") {
        const newFeedback = document.createElement("div");
        newFeedback.classList.add("feedback-item");
  
        // Display name
        const nameElement = document.createElement("div");
        nameElement.classList.add("name");
        nameElement.textContent = name;
  
        // Display rating stars for other people's feedback
        const feedbackStars = document.createElement("div");
        feedbackStars.classList.add("stars");
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.classList.add("star");
          star.innerHTML = "&#9733;";
          if (i <= rating) {
            star.classList.add("highlight");
          }
          feedbackStars.appendChild(star);
        }
  
        // Display the comment text
        const feedbackComment = document.createElement("p");
        feedbackComment.textContent = feedbackText.value.trim();
  
        newFeedback.appendChild(nameElement);
        newFeedback.appendChild(feedbackStars);
        newFeedback.appendChild(feedbackComment);
  
        // Append to the feedback list
        feedbackList.appendChild(newFeedback);
  
        // Clear the fields after submission
        userName.value = "";
        feedbackText.value = "";
        result.textContent = "Thank you for your feedback!";
      } else {
        result.textContent = "Please provide a name, rating, and feedback.";
      }
    });
  });
  