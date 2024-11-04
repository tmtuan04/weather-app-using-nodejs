import express, { urlencoded } from "express"
import axios from "axios";
import 'dotenv/config'

const app = express();

app.set("view engine", "ejs");

// Không có cái này thì CSS không được hiển thị
// Xoá ../public đi là được vì mọi tệp trong này đều coi là tệp tĩnh rồi
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

// Show diễn Back-end
app.get("/weather", async (req, res) => {
    // Đầu tiên cứ phải lấy dữ liệu từ ô input cái đã
    // GET: req.query
    // POST: req.body
    const city = req.query.city;

    // Tiếp theo đến API
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let weather = null;
    let error = null;
    try {
        // Gọi API thôi
        const response = await axios.get(apiUrl);
        // Trong Axios, response.data chứa dữ liệu thực được trả về từ API
        // Tong khi response là một đối tượng phức hợp với nhiều thông tin bổ sung về yêu cầu HTTP như: status, request, ...
        weather = response.data;
    } catch {
        error = "Error! Please try again";
    }
    res.render("index", { weather, error });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});