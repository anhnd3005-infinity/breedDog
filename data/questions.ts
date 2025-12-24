import { QuizQuestion } from "../types";

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Phong cách làm việc của bạn thường là gì?",
    options: [
      { label: "A", value: "Tập trung cao độ, 'cắn' task không buông 🦴" },
      { label: "B", value: "Vừa làm vừa giao lưu, kết nối mọi người 🗣️" },
      { label: "C", value: "Làm việc độc lập, không thích bị làm phiền 🛡️" },
      { label: "D", value: "Linh hoạt, đâu cần là có đó ⚡" },
    ],
  },
  {
    id: 2,
    text: "Khi deadline dí sát nút, bạn sẽ...",
    options: [
      { label: "A", value: "Hoảng loạn nhưng vẫn chạy hết tốc lực 🐕💨" },
      { label: "B", value: "Bình tĩnh xử lý, chia nhỏ công việc 🧩" },
      { label: "C", value: "Kêu gọi đồng đội hỗ trợ 'cứu nét' 🆘" },
      { label: "D", value: "Thức trắng đêm để hoàn thành cho bằng được 🌙" },
    ],
  },
  {
    id: 3,
    text: "Khi gặp người lạ ơi (khách hàng/đối tác mới), bạn sẽ?",
    options: [
      { label: "A", value: "Vẫy đuôi mừng rỡ, bắt chuyện ngay 👋" },
      { label: "B", value: "Quan sát kỹ càng rồi mới tiếp cận 🧐" },
      { label: "C", value: "Giữ khoảng cách, tỏ ra chuyên nghiệp 💼" },
      { label: "D", value: "Dùng sự hài hước để phá băng 🧊" },
    ],
  },
  {
    id: 4,
    text: "Phần thưởng sau một dự án thành công?",
    options: [
      { label: "A", value: "Một bữa ăn ngon lành, ngập tràn thịt 🍖" },
      { label: "B", value: "Ngủ một giấc thật đã đời 😴" },
      { label: "C", value: "Tụ tập party với team 🥳" },
      { label: "D", value: "Mua sắm món đồ mình thích từ lâu 🎁" },
    ],
  },
  {
    id: 5,
    text: "Bạn ghét nhất điều gì ở công sở?",
    options: [
      { label: "A", value: "Sự im lặng đáng sợ, không ai nói gì 🔇" },
      { label: "B", value: "Bị micromanage, soi mói từng tí 👀" },
      { label: "C", value: "Thay đổi kế hoạch liên tục xoành xoạch 🔄" },
      { label: "D", value: "Drama, nói xấu sau lưng 🐍" },
    ],
  },
];