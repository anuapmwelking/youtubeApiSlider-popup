//dummy youtube file
console.log("console added");

fetch(
  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDWVDfRBVvGopDitxk2xz5H4nUpiE4p4mY&channelId=UCnZIDPHsiOdSHeqXIqZGZNw&part=snippet,id&order=date&maxResults=20"
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong!!!");
    }
  })
  .then((data) => {
    const thumbnailArr = [];
    const videoBtnArr = [];
    const titleArr = [];
    data.items.map((e) => {
      //   console.log(e.snippet.thumbnails.high.url);
      videoBtnArr.push(e.id.videoId);
      thumbnailArr.push(e.snippet.thumbnails.high.url);
      titleArr.push(e.snippet.title);
    });
    thumbnailArr.pop();
    videoBtnArr.pop();
    titleArr.pop();
    // console.log(thumbnailArr);

    let html = "";
    for (let key of thumbnailArr) {
      html += `<div class="mySlides">
                      <img src="${key}" >
                  </div>`;
    }
    document
      .getElementById("slideshow-container")
      .insertAdjacentHTML("afterbegin", html);

    let title = "";
    for (let key of titleArr) {
      title += `<p class='titles' >${key}</p>`;
    }
    document
      .getElementById("title-container")
      .insertAdjacentHTML("afterbegin", title);

    let btn = "";
    for (let key of videoBtnArr) {
      btn += `<a href='http://www.youtube.com/watch?v=${key}' class='btns' target='_blank'> <button> Read More</button></a>`;
    }
    document
      .getElementById("button-container")
      .insertAdjacentHTML("afterbegin", btn);

    let slideIndex = 0;
    showSlides();

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 2000);
    }
    let titleIndex = 0;
    titleSlides();

    function titleSlides() {
      let i;
      let titles = document.getElementsByClassName("titles");
      for (i = 0; i < titles.length; i++) {
        titles[i].style.display = "none";
      }
      titleIndex++;
      if (titleIndex > titles.length) {
        titleIndex = 1;
      }
      titles[titleIndex - 1].style.display = "block";
      setTimeout(titleSlides, 2000);
    }

    let btnIndex = 0;
    btnSlides();

    function btnSlides() {
      let i;
      let btns = document.getElementsByClassName("btns");
      for (i = 0; i < btns.length; i++) {
        btns[i].style.display = "none";
      }
      btnIndex++;
      if (btnIndex > btns.length) {
        btnIndex = 1;
      }
      btns[btnIndex - 1].style.display = "block";
      setTimeout(btnSlides, 2000);
    }
  })
  .catch((error) => {
    console.log("inside catch");
    console.log(error);
  });

// console.log(typeof responseObj);
