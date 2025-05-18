// 今の時間を表示
setInterval(function(){
    var y = new Date().getFullYear();
    var m = new Date().getMonth()+1;
    var d = new Date().getDate();
    var h = new Date().getHours()-1;
    var min = new Date().getMinutes();
    var s = new Date().getSeconds();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    min = min < 10 ? '0' + min : min;
    s = s < 10 ? '0' + s : s;

    $("#time").html(y+"年"+m+"月"+d+"日"+" "+h+":"+min+":"+s);
},1000);

//OpenWeatherAPI（天気情報を取得）今の天気
const url = 'https://flowersknives.jp/weather.php';
$.ajax({
    url: url,
    type: 'get',
    cache: false,
    dataType: 'json'
}).done(function(data){
    console.log(data); //オブジェクト変数を確認

    const i = 1;
    let html = `
        <div>
            <div><img src="" class="todayimg"></div>
            <div class="weather">天气：${data.weather[0].description}</div>
            <div class="temp">温度：${data.main.temp}℃</div>
            <div class="wind">风速：${data.wind.speed}m/s</div>
        <div>
        `;
    $("#view").append(html);

    let tianqi = data.weather[0].description;
    let sunny = "晴";
    let rainy = "雨";
    let cloud = "云";

    console.log('天気：', tianqi);

    var now = new Date();
    var hours = now.getHours();

    //昼間で晴れ
    if(tianqi.indexOf(sunny) > -1 && hours >= 7 && hours < 19){
        $('body').css('backgroundImage', 'url(./img/sunny_day.jpeg)');
        $('body').css('color', '#000000');
    //夜で晴れ
    } else if (tianqi.indexOf(sunny) > -1 && (hours <7 || hours >= 19)){
        $('body').css('backgroundImage', 'url(./img/sunny_night.jpeg)');
    //昼間で雨
    } else if (tianqi.indexOf(rainy) > -1 && hours >= 7 && hours < 19) {
        $('body').css('backgroundImage', 'url(./img/rainy_day.jpeg)');
        $("#card").css('background-color', 'rgba(47, 47, 47, 0.6)');
    //夜で雨
    } else if (tianqi.indexOf(rainy) > -1 && (hours <7 || hours >= 19)){
        $('body').css('backgroundImage', 'url(./img/rainy_night.jpeg)');
    //昼間で曇り
    } else if (tianqi.indexOf(cloud) > -1 && hours >= 7 && hours < 19) {
        $('body').css('backgroundImage', 'url(./img/cloud_day.jpeg)');
        $('body').css('color', '#000000');
    //夜で曇り
    } else if (tianqi.indexOf(cloud) > -1 && (hours <7 || hours >= 19)){
        $('body').css('backgroundImage', 'url(./img/cloud_night.jpeg)');
        $("#card").css('background-color', 'rgba(47, 47, 47, 0.6)');
    }
});