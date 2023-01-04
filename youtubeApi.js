//insert your apikey
let apiKey = "AIzaSyAZUD-OQzz07s9uS5A7RiMG6ZXJS_bhafY";
// let apiKey = "AIzaSyDWVDfRBVvGopDitxk2xz5H4nUpiE4p4mY"; //quota exceeded for today
//insert your channelId
let yourChannelId = "UCnZIDPHsiOdSHeqXIqZGZNw";
fetch(
  `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${yourChannelId}&part=snippet,id&order=date&maxResults=20`
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
      videoBtnArr.push(e.id.videoId);
      thumbnailArr.push(e.snippet.thumbnails.high.url);
      titleArr.push(e.snippet.title);
    });
    thumbnailArr.pop();
    videoBtnArr.pop();
    titleArr.pop();

    let htmlThumb = "";
    for (let key of thumbnailArr) {
      htmlThumb += `<div class="mySlidess">
                      <img src="${key}" >
                  </div>`;
    }
    document
      .getElementById("slideshow-containers")
      .insertAdjacentHTML("afterbegin", htmlThumb);

    let titleYoutube = "";
    for (let key of titleArr) {
      titleYoutube += `<p class='titless' >${key}</p>`;
    }
    document
      .getElementById("title-containers")
      .insertAdjacentHTML("afterbegin", titleYoutube);

    let btnYoutube = "";
    for (let key of videoBtnArr) {
      btnYoutube += `<a href='http://www.youtube.com/watch?v=${key}' class='btnss' target='_blank'> <button> Read More</button></a>`;
    }
    document
      .getElementById("button-containers")
      .insertAdjacentHTML("afterbegin", btnYoutube);

    let index = 0;
    slider();
    function slider() {
      let i;
      let slides = document.getElementsByClassName("mySlidess");
      let titles = document.getElementsByClassName("titless");
      let btns = document.getElementsByClassName("btnss");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < titles.length; i++) {
        titles[i].style.display = "none";
      }
      for (i = 0; i < btns.length; i++) {
        btns[i].style.display = "none";
      }
      index++;
      if (
        index > slides.length &&
        index > titles.length &&
        index > btns.length
      ) {
        index = 1;
      }
      slides[index - 1].style.display = "block";
      titles[index - 1].style.display = "block";
      btns[index - 1].style.display = "block";
      setTimeout(slider, 2000);
    }
  })
  .catch((error) => {
    console.log("inside catch");
    console.log(error);
  });
