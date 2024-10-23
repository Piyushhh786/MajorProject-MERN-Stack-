const toggleReadMore = function (anchor) {
    console.log("toggleReadMore working properly");
    const shortComment = anchor.previousElementSibling; // The span with the short comment
    const fullComment = anchor.parentElement.previousElementSibling; // Adjust if you have a full comment hidden span

    if (anchor.innerHTML === 'More') {
        shortComment.style.display = 'none'; // Hide short comment
        fullComment.style.display = 'inline'; // Show full comment
        anchor.innerHTML = 'Less'; // Change to Less
    } else {
        shortComment.style.display = 'inline'; // Show short comment
        fullComment.style.display = 'none'; // Hide full comment
        anchor.innerHTML = 'More'; // Change to More
    }
}
