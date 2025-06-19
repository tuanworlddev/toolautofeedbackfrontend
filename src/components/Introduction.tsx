const Introduction = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-purple-500/10 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-300 p-6 md:p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-500">Dịch Vụ Hỗ Trợ Người Bán Hàng Wildberries</h1>
          <p className="text-lg text-purple-500 mt-2">Giải pháp All-in-One tối ưu hóa trải nghiệm bán hàng với công nghệ AI</p>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Tool 1: AI Auto Reply Feedback */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/30 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-black mb-2">Tự Động Trả Lời Phản Hồi</h3>
            <p className="text-black">
              Sử dụng AI để tự động trả lời các phản hồi và đánh giá từ khách hàng trên Wildberries. Công cụ phân tích nội dung phản hồi, tạo câu trả lời phù hợp, chuyên nghiệp, giúp tiết kiệm thời gian và xây dựng lòng tin với khách hàng.
            </p>
          </div>

          {/* Tool 2: AI Question Suggestion */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/30 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-black mb-2">Gợi Ý Trả Lời Câu Hỏi</h3>
            <p className="text-black">
              Công cụ AI gợi ý câu trả lời thông minh cho các câu hỏi của khách hàng về sản phẩm. Phân tích ngữ cảnh và nội dung câu hỏi, cung cấp câu trả lời chính xác, giúp tăng tỷ lệ hài lòng và thúc đẩy doanh số.
            </p>
          </div>

          {/* Tool 3: Revenue Report */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/30 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-black mb-2">Báo Cáo Doanh Thu</h3>
            <p className="text-black">
              Tạo báo cáo doanh thu chi tiết theo thời gian chỉ định (ngày, tuần, tháng). Công cụ phân tích dữ liệu bán hàng, hiển thị xu hướng và số liệu quan trọng, giúp người bán đưa ra quyết định kinh doanh hiệu quả.
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <img
            src="/avatar.jpg" // Thay bằng URL ảnh cá nhân
            alt="Nguyễn Anh Tuấn"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/30 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-black mb-2">Nguyễn Anh Tuấn</h2>
            <p className="text-gray-900">
              Một sinh viên Công nghệ Thông tin đam mê ứng dụng công nghệ để giải quyết các vấn đề thực tiễn. Với sự am hiểu về sàn thương mại điện tử Wildberries và công nghệ AI, tôi đã phát triển giải pháp All-in-One giúp người bán hàng tối ưu hóa quy trình, nâng cao hiệu quả kinh doanh và cải thiện trải nghiệm khách hàng.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <a href="https://www.facebook.com/nat.06012005/" target="_blank" className="px-6 py-3 bg-blue-500 backdrop-blur-md text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
            Liên Hệ Để Biết Thêm Chi Tiết
          </a>
        </div>
      </div>
    </div>
  );
};

export default Introduction;