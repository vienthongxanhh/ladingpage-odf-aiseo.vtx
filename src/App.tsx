/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Zap, Server, Wrench, CheckCircle2, Phone, Mail, ChevronRight, Star, Clock, ArrowRight, Menu, X, Check, Box, CloudLightning, Layers, Award, HeadphonesIcon, MessageCircle } from 'lucide-react';
import { NetworkBackground } from './components/NetworkBackground';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('rack');
  const [activeSpecFilter, setActiveSpecFilter] = useState('rack');
  const [activeFeature, setActiveFeature] = useState(0);
  const [showZaloOptions, setShowZaloOptions] = useState(false);

  const specificationsData: Record<string, { param: string, value: string }[]> = {
    rack: [
      { param: "Tiêu chuẩn lắp đặt", value: "Tủ rack 19 inch (Kích thước 1U, 2U, 4U tùy mức dung lượng)" },
      { param: "Dung lượng bọc nới", value: "Từ 8FO đến 144FO" },
      { param: "Chất liệu vỏ", value: "Thép lá cán lạnh cao cấp, sơn tĩnh điện sần chống xước, chống gỉ sét" },
      { param: "Độ dày vỏ thép", value: "1.2mm - 1.5mm đảm bảo độ cứng cáp dưới tải trọng lớn" },
      { param: "Hỗ trợ chuẩn Adapter", value: "Tương thích đa dạng SC, LC, FC, ST (Simplex/Duplex)" },
      { param: "Khay chứa mối hàn", value: "Thiết kế dạng xếp chồng thông minh, sức chứa 12-24 ống co nhiệt / khay" },
      { param: "Phụ kiện đồng bộ", value: "Khay hàn, ống co nhiệt, lạt nhựa, bộ ốc vít bắt rack, dây Pigtail, Adapter" },
      { param: "Nhiệt độ hoạt động", value: "-25°C đến +60°C" },
      { param: "Bán kính uốn cong quang", value: "≥ 40mm, giảm thiểu suy hao tín hiệu quang học" },
      { param: "Màu sắc tiêu chuẩn", value: "Xám ghi / Đen" }
    ],
    wall: [
      { param: "Kiểu lắp đặt", value: "Treo tường phẳng, gắn trên bảng điện mặt kĩ thuật nội bộ" },
      { param: "Dung lượng tiêu chuẩn", value: "Từ 2FO đến tối đa 32FO" },
      { param: "Chất liệu chế tạo", value: "Nhựa ABS chống cháy (mẫu 2-4FO) / Thép tấm cán lạnh (mẫu lớn hơn)" },
      { param: "Độ dày vỏ kim loại", value: "1.0mm - 1.2mm (phủ lớp sơn tĩnh điện chống rỉ ăn mòn)" },
      { param: "Hỗ trợ chuẩn Adapter", value: "Dễ dàng tích hợp SC, LC, FC" },
      { param: "Cơ chế bảo vệ", value: "Khóa gài tiện lợi hoặc khóa bảo mật dùng chìa (tùy mã)" },
      { param: "Môi trường tương thích", value: "Trong nhà (Indoor), trong môi trường văn phòng, thang máy, hộp kỹ thuật" },
      { param: "Phụ kiện đi kèm", value: "Ống co nhiệt, nở nhựa, ốc vít treo tường, dây Pigtail, Adapter" },
      { param: "Độ bền cơ học", value: "Chống chịu lực va đập tiêu chuẩn, khép kín chống côn trùng, chuột cắn" },
      { param: "Màu sắc tiêu chuẩn", value: "Trắng sữa / Xám sáng" }
    ],
    outdoor: [
      { param: "Kiểu lắp đặt đa dụng", value: "Treo cột điện, treo tường ngoài hiên, bờ rào cơ quan, trạm BTS" },
      { param: "Dung lượng mở rộng", value: "Từ 4FO đến 96FO" },
      { param: "Tiêu chuẩn bảo vệ", value: "Kháng nước, kháng mưa/bụi IP65 - IP66 có gioăng cao su bọc quanh mép" },
      { param: "Chất liệu vỏ chuyên dụng", value: "Thép mạ kẽm sơn tĩnh điện / Nhựa PC+ABS cường lực chống tia UV" },
      { param: "Độ dày vỏ kim loại", value: "1.2mm - 1.5mm, cứng cáp chống móp méo va đập ngoài trời" },
      { param: "Cổng cáp vào / ra", value: "Có trang bị ốc siết cáp chống nước (Cable Gland) chuyên dụng" },
      { param: "Cơ chế an toàn", value: "Khóa an toàn chuyên dụng, khó bị cạy phá" },
      { param: "Nhiệt độ hoạt động", value: "-40°C đến +85°C (Chịu được thời tiết nắng gắt hoặc giá rét khắc nghiệt)" },
      { param: "Phụ kiện đi kèm", value: "Khay hàn, ống co nhiệt, đai thép thít cáp, đai siết vặn cột điện" },
      { param: "Bán kính uốn cong quang", value: "≥ 40mm" }
    ],
    cabinet: [
      { param: "Môi trường & Vị trí", value: "Tiêu chuẩn Indoor đặt hệ thống mạng trung tâm, Outdoor đặt bệ móng bê tông" },
      { param: "Dung lượng siêu lớn", value: "144FO, 288FO, 576FO... có thể mở rộng lên tới 1440FO hoặc hơn" },
      { param: "Cấu trúc thiết kế", value: "Dạng Module cực kì dễ nâng cấp, tháo lắp. Có khoang rộng để chứa cáp dư" },
      { param: "Vật liệu khung vỏ", value: "Thép không gỉ (Inox 304/201) hoặc Thép mạ kẽm nhúng nóng siêu bền" },
      { param: "Độ dày vỏ thép", value: "1.5mm - 2.0mm, toàn bộ hệ khung tủ vô cùng vững chãi, chống xô lệch" },
      { param: "Tính năng mở rộng", value: "Sẵn sàng hệ thống gá cài cho bộ chia quang (Splitter PLC)" },
      { param: "Tiêu chuẩn bảo vệ (Outdoor)", value: "Kháng nước IP65, mái che vát dốc chống đọng nước, gioăng đệm siêu kín" },
      { param: "Hệ thống cửa", value: "1 hoặc 2 cánh (trước/sau), khóa chốt 3 điểm an toàn cao cấp chống phá hoại" },
      { param: "Hệ thống quản lý cáp", value: "Lược cài cáp thông minh, vòng quấn dây nhảy (Patch cord) chống rối, chống gập" },
      { param: "Khả năng chịu đựng", value: "Nhiệt độ -40°C ~ +85°C, Độ ẩm hoạt động ≤ 95% (tại 30°C)" }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    // --- Lắp Rack ---
    {
      id: 1,
      title: "ODF 8FO Maxtel Lắp Rack",
      category: "rack",
      cap: "8FO",
      desc: "Hộp phối quang chuẩn 19\" dung lượng nhỏ gọn 8 sợi quang, giải pháp tiết kiệm không gian.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/hop-phoi-quang-odf-maxtel.jpg",
      tags: ["Tiết kiệm", "19 inch"]
    },
    {
      id: 2,
      title: "ODF 12FO Maxtel Lắp Rack",
      category: "rack",
      cap: "12FO",
      desc: "Hộp phối quang chuẩn 19\" bắt rack, dung lượng 12 sợi quang, vỏ thép sơn tĩnh điện xám ghi.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/hop-phoi-quang-odf-maxtel.jpg",
      tags: ["Datacenter", "19 inch"]
    },
    {
      id: 3,
      title: "ODF 24FO Maxtel Lắp Rack",
      category: "rack",
      cap: "24FO",
      desc: "Thiết kế chuẩn 19\" dùng trong tủ Rack Telecom. Khay hàn xếp chồng linh hoạt, chuẩn SC/LC/FC.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/hop-phoi-quang-odf-maxtel.jpg",
      tags: ["Datacenter", "Bán chạy"]
    },
    {
      id: 4,
      title: "ODF 24FO Maxtel Khay Trượt",
      category: "rack",
      cap: "24FO",
      desc: "Hộp phối quang chính hãng Maxtel thiết kế dạng khay trượt tiện lợi cho bảo trì thi công.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2020/04/hop-phoi-quang-odf-alantek-24-fo-1.jpg",
      tags: ["Dự án", "Cao cấp"]
    },
    {
      id: 5,
      title: "ODF 48FO Maxtel Lắp Rack",
      category: "rack",
      cap: "48FO",
      desc: "Khay hàn quang xếp chồng dung lượng lớn, thép cán lạnh dày 1.2mm sơn tĩnh điện cao cấp.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/hop-phoi-quang-odf-maxtel.jpg",
      tags: ["Datacenter", "ISP"]
    },
    {
      id: 6,
      title: "ODF 72FO Maxtel Lắp Rack",
      category: "rack",
      cap: "72FO",
      desc: "Dung lượng ổn định đáp ứng mạng nội bộ tòa nhà quy mô tầm trung, thiết kế chắc chắn.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/hop-phoi-quang-odf-maxtel.jpg",
      tags: ["Building", "Tập trung"]
    },
    {
      id: 7,
      title: "ODF 96FO Maxtel Lắp Rack",
      category: "rack",
      cap: "96FO",
      desc: "Dung lượng cao cho các hệ thống trung tâm, tích hợp hệ thống kẹp cáp và quản lý dây nhảy thông minh.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/hop-phoi-quang-odf-maxtel.jpg",
      tags: ["High Density", "Tủ trung tâm"]
    },
    {
      id: 8,
      title: "ODF 144FO Maxtel Lắp Rack",
      category: "rack",
      cap: "144FO",
      desc: "Bản cao cấp nhất trong dòng lắp rack, chuyên dụng cho core switch với hệ khung vô cùng vững chãi.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/hop-phoi-quang-odf-maxtel.jpg",
      tags: ["Data Center", "Core"]
    },
    
    // --- Treo Tường (Wall) ---
    {
      id: 9,
      title: "ODF 2FO Maxtel Vỏ Nhựa",
      category: "wall",
      cap: "2FO",
      desc: "Chuyên dùng làm hộp đầu cuối quang FTTH trong nhà. Nhỏ gọn, nhựa ABS chống cháy.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["FTTH", "Nhỏ gọn"]
    },
    {
      id: 10,
      title: "ODF 4FO Maxtel Vỏ Nhựa",
      category: "wall",
      cap: "4FO",
      desc: "Giải pháp rẻ, đẹp cho camera IP, hệ thống mạng văn phòng quy mô nhỏ.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["Camera", "LAN"]
    },
    {
      id: 11,
      title: "ODF 4FO Maxtel Kim Loại",
      category: "wall",
      cap: "4FO",
      desc: "Vỏ thép siêu bền bảo vệ mối hàn tuyệt đối khỏi côn trùng, thi công đơn giản tại tủ kỹ thuật.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["Indoor", "Kim loại"]
    },
    {
      id: 12,
      title: "ODF 8FO Maxtel Kim Loại Treo Tường",
      category: "wall",
      cap: "8FO",
      desc: "Hộp phối quang Maxtel nhỏ gọn, vỏ kim loại chắc chắn, dùng để treo tường trong nhà hoặc tủ tầng.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["Indoor", "Văn phòng"]
    },
    {
      id: 13,
      title: "ODF 12FO Maxtel Kim Loại",
      category: "wall",
      cap: "12FO",
      desc: "Kích thước tiêu chuẩn cho mạng phân phối tòa nhà, trang bị đầy đủ khóa gài chắc chắn.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["Tòa nhà", "Trục đứng"]
    },
    {
      id: 14,
      title: "ODF 16FO Maxtel Kim Loại",
      category: "wall",
      cap: "16FO",
      desc: "Tủ treo tường phân tuyến quang vừa và nhỏ, rất thích hợp cho mạng LAN tòa nhà cỡ trung bình.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["Mid-size", "LAN"]
    },
    {
      id: 15,
      title: "ODF 24FO Maxtel Kim Loại Treo Tường",
      category: "wall",
      cap: "24FO",
      desc: "Tủ ODF gắn tường lớn, quản lý được 24 đường quang, phân tủ cho nhiều phòng ban/căn hộ.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["MDF", "Building"]
    },
    {
      id: 16,
      title: "ODF 32FO Maxtel Kim Loại Treo Tường",
      category: "wall",
      cap: "32FO",
      desc: "Dòng tủ ODF gắn tường lớn nhất trong phân khúc treo, đáp ứng tốt cho trạm phân phối cấp tầng.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cau-tao-hop-phoi-quang-odf.jpg",
      tags: ["MDF", "Tầng"]
    },

    // --- Ngoài Trời (Outdoor) ---
    {
      id: 17,
      title: "ODF 4FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "4FO",
      desc: "Giải pháp tiết kiệm từ Maxtel cho kết nối quang ngoài trời quy mô nhỏ, chống nước IP65.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["Camera", "Outdoor"]
    },
    {
      id: 18,
      title: "ODF 8FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "8FO",
      desc: "Hộp quang chia cáp nhỏ ngoài trời, nẹp chống rỉ, lõi kín nước an toàn môi trường khắc nghiệt.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["Nội bộ", "Outdoor"]
    },
    {
      id: 19,
      title: "ODF 12FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "12FO",
      desc: "Chuẩn chống nước IP65, thiết kế chắc chắn có khóa an toàn. Phù hợp phân phối quang cột điện.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["Outdoor", "Cột điện"]
    },
    {
      id: 20,
      title: "ODF 16FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "16FO",
      desc: "Hộp ODF Outdoor kích cỡ tầm trung cho hệ thống mạng ngoại vi, tích hợp gioăng cao su chịu nhiệt.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["Ngoại vi", "Cột điện"]
    },
    {
      id: 21,
      title: "ODF 24FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "24FO",
      desc: "Tủ đấu nối cáp quang ngoài xưởng lưới dọc, hỗ trợ splitter quang và phụ kiện phong phú.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["Telecom", "Trạm"]
    },
    {
      id: 22,
      title: "ODF 32FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "32FO",
      desc: "Sản phẩm chiến lược cho trạm chia nhỏ lẻ, hộp trang bị tay treo và ngàm chịu lực cáp cực tốt.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["Trạm", "Outdoor"]
    },
    {
      id: 23,
      title: "ODF 48FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "48FO",
      desc: "Tủ ODF chân đế cột ngoài trời tiêu chuẩn, vỏ làm bằng thép lá cán lạnh độ dày lên tới 1.5mm.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["BTS", "Khu CN"]
    },
    {
      id: 24,
      title: "ODF 96FO Maxtel Ngoài Trời",
      category: "outdoor",
      cap: "96FO",
      desc: "Hệ tủ lớn dạng treo cột hoặc bệ hạ tầng, đáp ứng đấu nối số lượng lớn cáp feeder.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2018/11/odf-4fo-ngoai-troi-4-1.jpg",
      tags: ["Hạ tầng", "Mạng trục"]
    },

    // --- Tủ Phối Quang (Cabinet) ---
    {
      id: 25,
      title: "Tủ Phối Quang ODF 144FO Maxtel",
      category: "cabinet",
      cap: "144FO",
      desc: "Tủ giao tiếp quang tập trung, dùng để phân tán sợi cáp đi các hướng, thích hợp các tủ POP nhỏ.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2021/11/tu-phoi-quang-odf-dung-luong-toi-da-192fo-5.jpg",
      tags: ["POP", "Outdoor"]
    },
    {
      id: 26,
      title: "Tủ Phối Quang ODF 192FO Maxtel",
      category: "cabinet",
      cap: "192FO",
      desc: "Tủ phối quang Maxtel dung lượng lớn ngoài trời, bệ móng bê tông cứng cáp, quản lý cáp mạng tập trung.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2021/11/tu-phoi-quang-odf-dung-luong-toi-da-192fo-5.jpg",
      tags: ["Outdoor", "Hạ tầng"]
    },
    {
      id: 27,
      title: "Tủ Phối Quang ODF 288FO Maxtel",
      category: "cabinet",
      cap: "288FO",
      desc: "Sản phẩm chiến lược cho mạng FTTH, thiết kế module tích hợp cả khối chia quang splitter tiện lợi.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2021/11/tu-phoi-quang-odf-dung-luong-toi-da-192fo-5.jpg",
      tags: ["FTTH", "Tập trung"]
    },
    {
      id: 28,
      title: "Tủ Phối Quang ODF 432FO Maxtel",
      category: "cabinet",
      cap: "432FO",
      desc: "Hạ tầng quang cáp ngầm với tủ phân phối ODF 432FO tích hợp đầy đủ module splitter và nối cáp.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2021/11/tu-phoi-quang-odf-dung-luong-toi-da-192fo-5.jpg",
      tags: ["Quang ngầm", "Mạng trục"]
    },
    {
      id: 29,
      title: "Tủ Phối Quang ODF 576FO Maxtel",
      category: "cabinet",
      cap: "576FO",
      desc: "Khối lượng sợi lớn được phân chia khoa học, dùng nhiều trong các dự án quang hóa toàn thành phố.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2020/11/san-phamtu-phoi-quang-odf-dung-luong-toi-da-1440fo-2.jpg",
      tags: ["Core", "Nhà mạng"]
    },
    {
      id: 30,
      title: "Tủ Phối Quang ODF 864FO Maxtel",
      category: "cabinet",
      cap: "864FO",
      desc: "Tủ ODF dùng cho trung tâm điều hành cực cấp huyện, cho phép quản lý tuyến quang đi liên tỉnh.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2020/11/san-phamtu-phoi-quang-odf-dung-luong-toi-da-1440fo-2.jpg",
      tags: ["Nhà mạng", "Đường dài"]
    },
    {
      id: 31,
      title: "Tủ Phối Quang ODF 1152FO Maxtel",
      category: "cabinet",
      cap: "1152FO",
      desc: "Hệ thống tủ indoor/outdoor đặt tại các trung tâm chuyển mạch lớn, bảo vệ tối đa các đường truyền quang ngầm.",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2020/11/san-phamtu-phoi-quang-odf-dung-luong-toi-da-1440fo-2.jpg",
      tags: ["Telecom", "Trung tâm"]
    },
    {
      id: 32,
      title: "Tủ Phối Quang ODF 1440FO Maxtel",
      category: "cabinet",
      cap: "1440FO",
      desc: "Tủ ODF Maxtel tổng dung lượng cực khủng, phân phối quang cho các trạm viễn thông trung tâm (POP).",
      img: "https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2020/11/san-phamtu-phoi-quang-odf-dung-luong-toi-da-1440fo-2.jpg",
      tags: ["Datacenter", "Mạng lõi"]
    }
  ];

  const filteredProducts = products.filter(p => p.category === activeFilter);

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-white scroll-smooth pb-20 sm:pb-0 relative">
      <NetworkBackground />
      {/* Sticky Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0f172a]  shadow-[0_0_10px_rgba(37,166,223,0.2)] py-3 md:py-4' : 'bg-[#0f172a]  md:bg-[#0f172a]   py-4 md:py-6 border-b border-brand-500/30 md:border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="https://maxtel.vn/wp-content/uploads/2024/06/cropped-Logo-MAXTEL-3000.png" alt="MAXTEL Logo" className="h-8 md:h-10 w-auto object-contain" />
            </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <a href="#features" className="text-sm font-medium text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:text-brand-500">Đặc tính</a>
            <a href="#products" className="text-sm font-medium text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:text-brand-500">Sản phẩm</a>
            <a href="#specifications" className="text-sm font-medium text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:text-brand-500">Thông số</a>
            <a href="#contact-section" className="text-sm font-medium text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:text-brand-500">Báo giá</a>
          </div>
          
          <div className="hidden md:block">
            <button 
              onClick={scrollToContact}
              className="bg-accent-600 hover:bg-accent-500 text-white shadow-[0_0_20px_rgba(195,28,36,0.6)] border border-accent-400/50 px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-[0_4px_14px_0_rgba(249,115,22,0.39)]"
            >
              Nhận Báo Giá Ngay
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            aria-label="Toggle menu"
            className="md:hidden p-3 text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#0f172a]  border-b border-brand-500/30 absolute w-full"
            >
              <div className="px-4 py-4 flex flex-col space-y-2">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-base font-medium text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:bg-slate-800 rounded-lg transition-colors">Đặc tính</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-base font-medium text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:bg-slate-800 rounded-lg transition-colors">Sản phẩm</a>
                <a href="#specifications" onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-base font-medium text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:bg-slate-800 rounded-lg transition-colors">Thông số kỹ thuật</a>
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollToContact(); }}
                  className="w-full mt-4 bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/20 px-4 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-5 h-5" /> Liên hệ tư vấn
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-96 h-96 bg-brand-800/40 rounded-full blur-2xl md:blur-3xl opacity-30 md:opacity-50"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-96 h-96 bg-accent-500/10 rounded-full blur-2xl md:blur-3xl opacity-30 md:opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left bg-[#020617]/60 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-[2rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-100 text-brand-500 font-medium text-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-glow-red"></span>
                Lựa chọn hàng đầu Việt Nam
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] lg:leading-[1.15] mb-4 lg:mb-6">
                Hộp Phối Quang ODF <span className="text-gradient hover:animate-glow-red transition-all duration-300 cursor-default block mt-1 lg:mt-2">Maxtel Cao Cấp</span>
              </h1>
              <p className="text-base sm:text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 lg:px-0">
                Giải pháp bảo vệ điểm đấu nối quang hoàn hảo. Vỏ thép sơn tĩnh điện chống gỉ sét, thiết kế thông minh, tối ưu cho hạ tầng viễn thông chuyên nghiệp.
              </p>

              {/* Mobile Image (Hidden on Desktop) */}
              <div className="lg:hidden mb-8 relative">
                <div className="rounded-3xl p-1.5 sm:p-2 bg-gradient-to-tr from-brand-100 to-white shadow-2xl relative">
                  <div className="absolute top-4 right-4 bg-[#0f172a] px-3 py-1.5 rounded-full font-bold text-accent-600 text-xs shadow-sm z-20 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current pt-0.5" /> 4.9/5 Excellent
                  </div>
                  <div className="bg-slate-100 rounded-2xl overflow-hidden aspect-[4/3] relative flex items-center justify-center border border-brand-500/40">
                    <img 
                      src="https://maxtel.vn/wp-content/uploads/2026/05/banner1.jpg" 
                      fetchPriority="high" 
                      loading="eager" 
                      alt="Banner ODF Maxtel" 
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105" 
                      onClick={() => setSelectedImage("https://maxtel.vn/wp-content/uploads/2026/05/banner1.jpg")}
                    />
                    <div className="absolute inset-0 bg-brand-900/40 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                      <span className="text-white font-medium text-sm border border-white/30 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">Phóng to ảnh</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 px-4 sm:px-0">
                <button 
                  onClick={scrollToContact}
                  className="w-full sm:w-auto bg-brand-600 hover:bg-blue-600 text-white px-6 py-4 lg:px-8 lg:py-4 rounded-xl sm:rounded-full font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,166,223,0.4)] shadow-brand-500/20"
                >
                  Nhận Tư Vấn & Báo Giá <ArrowRight className="w-5 h-5" />
                </button>
                <a 
                  href="#products"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 lg:px-8 lg:py-4 rounded-xl sm:rounded-full font-bold text-base sm:text-lg transition-all bg-brand-600 hover:bg-blue-600 text-white border border-brand-500/50 shadow-[0_0_20px_rgba(37,166,223,0.4)] shadow-brand-500/20"
                >
                  Xem Sản Phẩm
                </a>
              </div>
              
              <div className="mt-6 lg:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 text-sm text-brand-50">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-brand-800/40 border-2 border-white flex items-center justify-center shadow-sm">
                      <UserIcon className="w-4 h-4 text-brand-500" />
                    </div>
                  ))}
                </div>
                <p>Hơn <strong>1,200+</strong> nhà thầu tin dùng</p>
              </div>
            </motion.div>

            {/* Desktop Image (Hidden on Mobile) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative lg:ml-10"
            >
              <div className="rounded-3xl p-1.5 sm:p-2 bg-gradient-to-tr from-brand-100 to-white shadow-2xl relative">
                <div className="absolute top-4 right-4 bg-[#0f172a]  px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-accent-600 text-xs sm:text-sm shadow-sm z-20 flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current pt-0.5" /> 4.9/5 Excellent
                </div>
                {/* Product Image */}
                <div className="bg-slate-100 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-auto sm:h-[420px] relative flex md:flex-col items-center justify-center border border-brand-500/40">
                  <img 
                    src="https://maxtel.vn/wp-content/uploads/2026/05/banner1.jpg" 
                    fetchPriority="high" 
                    loading="eager" 
                    alt="Banner ODF Maxtel" 
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105" 
                    onClick={() => setSelectedImage("https://maxtel.vn/wp-content/uploads/2026/05/banner1.jpg")}
                  />
                  
                  {/* Overlay for zoom hint */}
                  <div className="absolute inset-0 bg-brand-900/40 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                    <span className="text-white font-medium text-sm border border-white/30 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">Phóng to ảnh</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Lines Section */}
      <section id="products" className="py-12 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase"><span className="animate-pulse">Danh Mục Sản Phẩm</span></h2>
            <p className="inline-block mt-2 text-3xl leading-8 font-extrabold tracking-tight text-accent-500 bg-[#0f172a]/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(37,166,223,0.2)] border border-brand-500/30 sm:text-4xl">
              Sản Phẩm ODF Chính Hãng
            </p>
            <p className="mt-4 text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">Đầy đủ các mẫu mã từ ODF trong nhà, ngoài trời đến tủ phối quang dung lượng cực lớn.</p>
          </div>

          <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 hide-scrollbar snap-x snap-mandatory px-4 -mx-4 md:px-0 md:mx-0">
            {[
              { id: 'rack', name: 'Lắp Rack' },
              { id: 'wall', name: 'Treo Tường' },
              { id: 'outdoor', name: 'Ngoài Trời' },
              { id: 'cabinet', name: 'Tủ Phối Quang' },
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-shrink-0 snap-center px-5 py-3 sm:py-2.5 rounded-full text-sm font-semibold transition-all min-h-[44px] ${
                  activeFilter === filter.id 
                    ? 'bg-brand-600 text-white shadow-[0_0_10px_rgba(37,166,223,0.2)] shadow-brand-500/20 md:scale-105' 
                    : 'bg-[#0f172a] text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] hover:bg-slate-800 border border-brand-500/30'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 pb-8">
            <AnimatePresence>
              {filteredProducts.map((prod) => (
                <motion.div 
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(37,166,223,0.15)] border border-brand-500/30 flex flex-col group cursor-pointer w-full"
                  onClick={scrollToContact}
                >
                  <div className="aspect-square relative overflow-hidden bg-white rounded-t-2xl p-4 flex items-center justify-center">
                    <img src={prod.img} loading="lazy" decoding="async" alt={prod.title} className="w-full h-full p-2 object-contain group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-brand-600/90 text-white border border-brand-400/50 text-sm font-bold px-2.5 py-1 rounded shadow-sm">{prod.cap}</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-5 flex-1 flex flex-col border-t border-brand-500/10">
                    <h3 className="text-[11px] leading-tight sm:text-lg sm:leading-normal font-bold text-white mb-2 line-clamp-3 sm:line-clamp-2 group-hover:text-brand-500 transition-colors">{prod.title}</h3>
                    <div className="flex items-center justify-center mt-auto pt-2 gap-2">
                      <button className="text-brand-400 bg-brand-900/40 border border-brand-500/30 group-hover:bg-brand-600 group-hover:text-white px-2 py-1.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap w-full">
                        NHẬN BÁO GIÁ
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <div className="text-center mt-12 sm:mt-16 pt-8 border-t border-brand-500/30">
            <button onClick={scrollToContact} className="w-full sm:w-auto bg-accent-600 hover:bg-accent-500 text-white shadow-[0_0_20px_rgba(195,28,36,0.6)] border border-accent-400/50 font-bold px-8 py-3.5 rounded-xl sm:rounded-full inline-flex items-center justify-center gap-2 text-base transition-colors">
              Xem toàn bộ Catalogue (PDF) <ChevronRight className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </section>

      {/* Brands / Social Proof */}
      <section className="py-8 md:py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-brand-50 uppercase tracking-wider mb-6 md:mb-8">Các đối tác tin cậy đã sử dụng Maxtel</p>
          
          <div className="relative flex overflow-x-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex animate-marquee whitespace-nowrap min-w-max">
              {[
                { name: 'Viettel', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%23EF4444%22%3EViettel%3C/text%3E%3C/svg%3E', theme: 'border-red-500/30 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]' },
                { name: 'VNPT', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%233B82F6%22%3EVNPT%3C/text%3E%3C/svg%3E', theme: 'border-blue-400/30 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]' },
                { name: 'FPT Telecom', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2224%22 font-weight=%22bold%22 fill=%22%23F97316%22%3EFPT Telecom%3C/text%3E%3C/svg%3E', theme: 'border-orange-500/30 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]' },
                { name: 'Mobifone', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%2322D3EE%22%3EMobifone%3C/text%3E%3C/svg%3E', theme: 'border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]' },
                { name: 'CMC', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%23818CF8%22%3ECMC%3C/text%3E%3C/svg%3E', theme: 'border-indigo-400/30 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(129,140,248,0.4)]' },
                { name: 'VinaPhone', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%233B82F6%22%3EVinaPhone%3C/text%3E%3C/svg%3E', theme: 'border-blue-500/30 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]' },
                { name: 'Samsung', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%232563EB%22%3ESAMSUNG%3C/text%3E%3C/svg%3E', theme: 'border-blue-600/30 hover:border-blue-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]' },
                { name: 'VNG', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%23EA580C%22%3EVNG%3C/text%3E%3C/svg%3E', theme: 'border-orange-600/30 hover:border-orange-600 hover:shadow-[0_0_15px_rgba(234,88,12,0.4)]' },
                // Duplicate items for infinite scroll
                { name: 'Viettel', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%23EF4444%22%3EViettel%3C/text%3E%3C/svg%3E', theme: 'border-red-500/30 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]' },
                { name: 'VNPT', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%233B82F6%22%3EVNPT%3C/text%3E%3C/svg%3E', theme: 'border-blue-400/30 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]' },
                { name: 'FPT Telecom', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2224%22 font-weight=%22bold%22 fill=%22%23F97316%22%3EFPT Telecom%3C/text%3E%3C/svg%3E', theme: 'border-orange-500/30 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]' },
                { name: 'Mobifone', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%2322D3EE%22%3EMobifone%3C/text%3E%3C/svg%3E', theme: 'border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]' },
                { name: 'CMC', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%23818CF8%22%3ECMC%3C/text%3E%3C/svg%3E', theme: 'border-indigo-400/30 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(129,140,248,0.4)]' },
                { name: 'VinaPhone', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%233B82F6%22%3EVinaPhone%3C/text%3E%3C/svg%3E', theme: 'border-blue-500/30 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]' },
                { name: 'Samsung', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%232563EB%22%3ESAMSUNG%3C/text%3E%3C/svg%3E', theme: 'border-blue-600/30 hover:border-blue-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]' },
                { name: 'VNG', logo: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2228%22 font-weight=%22bold%22 fill=%22%23EA580C%22%3EVNG%3C/text%3E%3C/svg%3E', theme: 'border-orange-600/30 hover:border-orange-600 hover:shadow-[0_0_15px_rgba(234,88,12,0.4)]' },
              ].map((partner, idx) => (
                <div key={idx} className={`mx-3 px-4 py-2 sm:px-6 sm:py-3 rounded-xl border transition-all duration-300 bg-white/95 hover:bg-white flex items-center justify-center w-[120px] sm:w-[180px] h-[60px] sm:h-[80px] cursor-default inline-flex ${partner.theme}`}>
                  <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain transition-transform hover:scale-105 filter drop-shadow-sm p-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Outline */}
      <section id="features" className="py-12 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 overflow-hidden">
            <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase">Chất Lượng Vượt Trội</h2>
            <p className="inline-block mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-8 font-extrabold tracking-tight text-accent-500 bg-[#0f172a]/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(37,166,223,0.2)] border border-brand-500/30 text-center">
              VÌ SAO ODF MAXTEL LẠI ĐƯỢC SĂN ĐÓN
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Sidebar / Tabs */}
            <div 
              className="hidden md:flex flex-col gap-3 w-64 lg:w-80 flex-shrink-0"
            >
              {[
                { 
                  icon: ShieldCheck, 
                  title: "Chất Liệu Cấu Tạo", 
                  desc: "Làm từ thép cán lạnh cao cấp, bề mặt phủ sơn tĩnh điện chống xước, chống gỉ sét hoàn hảo." 
                },
                { 
                  icon: Wrench, 
                  title: "Đầy Đủ Phụ Kiện", 
                  desc: "Trang bị sẵn khay hàn, ống co nhiệt, dây nối quang Pigtail và Adapter chuẩn xuất xưởng." 
                },
                { 
                  icon: Zap, 
                  title: "Hiệu Suất Tối Đa", 
                  desc: "Đảm bảo suy hao tiếp xúc siêu thấp (<0.2dB), cáp quang vào ra được cố định cực kỳ chắc chắn." 
                }
              ].map((feat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`px-5 py-3 md:py-4 md:px-6 rounded-xl text-sm transition-all text-left whitespace-nowrap md:whitespace-normal border flex flex-col gap-2 md:min-w-0 ${
                    activeFeature === idx 
                      ? 'bg-brand-600/10 border-brand-500 shadow-[0_0_20px_rgba(37,166,223,0.15)] scale-[1.02]' 
                      : 'bg-[#0f172a] border-brand-500/20 hover:bg-slate-800 hover:border-brand-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeFeature === idx ? 'bg-brand-500/20' : 'bg-slate-800'}`}>
                      <feat.icon className={`w-5 h-5 flex-shrink-0 ${activeFeature === idx ? 'text-brand-400' : 'text-brand-500'}`} />
                    </div>
                    <span className={`font-bold text-base ${activeFeature === idx ? 'text-white' : 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]'}`}>{feat.title}</span>
                  </div>
                  <p className={`text-sm leading-relaxed hidden md:block mt-1 ${activeFeature === idx ? 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]' : 'text-slate-200'} `}>{feat.desc}</p>
                </button>
              ))}
            </div>

            {/* Feature Content Showcase */}
            <div className="md:flex-1 w-full relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[80%] max-h-[80%] bg-brand-600/10 blur-[40px] md:blur-[80px] pointer-events-none rounded-full"></div>
              
               <div className="glass-panel relative rounded-2xl shadow-[0_0_30px_rgba(37,166,223,0.15)] overflow-hidden border border-brand-500/30 w-full z-10 bg-[#0f172a] aspect-video sm:aspect-auto sm:h-[400px] group">
                 <AnimatePresence mode="wait">
                   {[
                     {
                       title: "Chất Liệu Cấu Tạo",
                       desc: "Chi tiết hình ảnh độ dày thép, nước sơn tĩnh điện và cấu trúc gia cố chịu lực của vỏ ODF.",
                       icon: ShieldCheck,
                       image: "https://maxtel.vn/wp-content/uploads/2026/05/chat-lieu-cau-tao-1odf.jpg"
                     },
                     {
                       title: "Đầy Đủ Phụ Kiện",
                       desc: "Hình ảnh trọn bộ phụ kiện đi kèm trong hộp: Adapter, dây Pigtail, ống co nhiệt, lạt nhựa, ốc chờ...",
                       icon: Wrench,
                       image: "https://maxtel.vn/wp-content/uploads/2026/05/day-du-phu-kien.jpg"
                     },
                     {
                       title: "Hiệu Suất Tối Đa",
                       desc: "Cận cảnh hình ảnh dây cáp quang được cố định bằng khay hàn tiêu chuẩn, kẹp cáp chắc chắn không gây gãy gập.",
                       icon: Zap,
                       image: "https://maxtel.vn/wp-content/uploads/2026/05/hieu-suat-toi-da.jpg"
                     }
                   ].map((content, idx) => (
                     activeFeature === idx && (
                       <motion.div
                         key={idx}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="flex flex-col items-center text-center w-full h-full justify-center absolute inset-0 cursor-pointer"
                         onClick={() => setSelectedImage(content.image)}
                       >
                         {/* Image Background */}
                         <img src={content.image} loading="lazy" decoding="async" alt={content.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       </motion.div>
                     )
                   ))}
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Awards Backdrop */}
      <section id="certifications" className="py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase">Uy tín & Chất lượng</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Chứng Nhận & Giải Thưởng
            </p>
            <p className="mt-4 text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">
              Các sản phẩm ODF Maxtel đều đạt kiểm định khắt khe, đầy đủ giấy tờ chứng nhận cho dự án.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-2 sm:p-4 border border-brand-500/30 shadow-[0_0_30px_rgba(37,166,223,0.15)] max-w-5xl mx-auto relative group overflow-hidden">
             {/* Glow effect on hover */}
             <div className="absolute inset-0 bg-gradient-to-r from-brand-600/0 via-brand-500/10 to-brand-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full"></div>
             
             <div className="w-full bg-[#020617] rounded-xl sm:rounded-2xl border border-brand-500/20 overflow-hidden relative group-hover:border-brand-500/40 transition-colors">
               <img src="https://maxtel.vn/wp-content/uploads/2026/05/giay-to111.jpg" loading="lazy" decoding="async" alt="ISO Certification and Awards" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section id="specifications" className="py-12 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase">Thông Số Kỹ Thuật</h2>
            <p className="inline-block mt-2 text-3xl leading-8 font-extrabold tracking-tight text-accent-500 bg-[#0f172a]/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(37,166,223,0.2)] border border-brand-500/30 sm:text-4xl">
              Cấu Hình Chi Tiết Từng Dòng Sản Phẩm
            </p>
            <p className="mt-4 text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">Bảng thông số kỹ thuật chuẩn giúp quý khách dễ dàng lựa chọn sản phẩm phù hợp với dự án.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Sidebar / Tabs */}
            <div 
              className="flex overflow-x-auto md:flex-col gap-2 sm:gap-3 md:w-56 lg:w-72 pb-2 md:pb-0 flex-shrink-0 hide-scrollbar snap-x snap-mandatory px-4 -mx-4 md:px-0 md:mx-0"
            >
               {[
                { id: 'rack', name: 'Lắp Rack', icon: Server },
                { id: 'wall', name: 'Treo Tường', icon: Box },
                { id: 'outdoor', name: 'Ngoài Trời', icon: CloudLightning },
                { id: 'cabinet', name: 'Tủ Phối Quang', icon: Layers },
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveSpecFilter(filter.id)}
                  className={`shrink-0 snap-center px-5 py-3.5 md:py-4 md:px-6 rounded-xl text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal border flex items-center gap-3 relative min-h-[48px] ${
                    activeSpecFilter === filter.id 
                      ? 'bg-brand-600 text-white border-brand-400 shadow-[0_0_20px_rgba(37,166,223,0.3)] shadow-brand-500/20' 
                      : 'bg-[#0f172a] text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] border-brand-500/30 hover:bg-slate-800 hover:border-brand-500/60'
                  }`}
                >
                  <filter.icon className={`w-5 h-5 flex-shrink-0 ${activeSpecFilter === filter.id ? 'text-white' : 'text-brand-400'}`} />
                  <span className="flex-1">{filter.name}</span>
                  <ChevronRight className={`w-4 h-4 hidden md:block transition-transform duration-300 ${activeSpecFilter === filter.id ? 'opacity-100 transform translate-x-1' : 'opacity-0 -translate-x-2'}`} />
                </button>
              ))}
            </div>

            {/* Spec Table */}
            <div className="md:flex-1 w-full relative px-4 md:px-0">
              {/* Optional background glow for table */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[80%] max-h-[80%] bg-brand-600/10 blur-[40px] md:blur-[80px] pointer-events-none rounded-full hidden md:block"></div>
              
              <div className="relative md:rounded-2xl md:shadow-[0_0_30px_rgba(37,166,223,0.15)] md:overflow-hidden md:border border-brand-500/30 w-full z-10 bg-transparent md:bg-[#0f172a]/80 md:backdrop-blur-md">
                 <div className="flex flex-col">
                   <div className="hidden md:grid md:grid-cols-5 bg-black/40 border-b border-brand-500/40">
                     <div className="py-4 px-6 text-sm font-bold text-white col-span-2 border-r border-brand-500/30">Đặc tính kỹ thuật</div>
                     <div className="py-4 px-6 text-sm font-bold text-brand-50 col-span-3">Chi tiết thông số</div>
                   </div>
                   <div className="md:max-h-[500px] md:overflow-y-auto">
                     <AnimatePresence mode="wait">
                       <motion.div
                          key={activeSpecFilter}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col gap-3 md:gap-0"
                       >
                         {specificationsData[activeSpecFilter].map((spec, index) => (
                           <div key={index} className="flex flex-col md:grid md:grid-cols-5 md:border-b last:border-b-0 border-brand-500/30 hover:bg-brand-900/20 transition-all duration-300 group bg-[#0f172a] md:bg-transparent rounded-xl md:rounded-none border md:border-none shadow-sm md:shadow-none p-1 md:p-0">
                             <div className="py-3 px-4 md:px-6 md:py-4 text-[11px] md:text-sm font-bold tracking-widest uppercase md:tracking-normal md:font-semibold text-brand-400 md:text-brand-50 md:bg-black/20 md:border-r border-brand-500/20 col-span-2 md:group-hover:text-brand-400 transition-colors flex items-center border-b border-brand-500/10 md:border-b-0">
                               {spec.param}
                             </div>
                             <div className="pb-3 pt-2 px-4 md:px-6 md:py-4 text-[15px] md:text-sm text-white md:text-slate-100 col-span-3 leading-relaxed flex items-center font-medium md:font-normal">
                               {spec.value}
                             </div>
                           </div>
                         ))}
                       </motion.div>
                     </AnimatePresence>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-12 md:py-24 relative overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 bg-brand-900/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase">So Sánh Chất Lượng</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Sự Khác Biệt Giữa Maxtel & Sản Phẩm Thông Thường
            </p>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 -mx-4 hide-scrollbar">
            {[
              { 
                feature: "Độ dày thép vỏ", 
                normal: "0.8mm - 1.0mm, mềm, dễ móp méo khi vận chuyển.", 
                maxtel: "1.2mm - 1.5mm, cứng cáp, chịu lực va đập cực tốt." 
              },
              { 
                feature: "Lớp sơn bề mặt", 
                normal: "Sơn phun thông thường, dễ bong tróc, nhanh xuống cấp, gỉ sét.", 
                maxtel: "Sơn tĩnh điện cao cấp, siêu mịn, chống gỉ sét trên 10 năm." 
              },
              { 
                feature: "Khay hàn quang", 
                normal: "Nhựa tái chế giòn, dễ gãy khớp bản lề khi thao tác nhiều.", 
                maxtel: "Nhựa ABS/PC cao cấp, dẻo dai, chịu nhiệt, bản lề gập mở êm ái." 
              },
              { 
                feature: "Phụ kiện đi kèm", 
                normal: "Thường bị bớt hoặc sử dụng phụ kiện (dây, đầu nối) chất lượng kém.", 
                maxtel: "Full bộ chuẩn chất lượng: Adapter, Pigtail, Khay hàn, Ống co..." 
              },
              { 
                feature: "Suy hao (Insertion Loss)", 
                normal: "> 0.3dB, kết nối chập chờn, ảnh hưởng tốc độ mạng.", 
                maxtel: "Siêu thấp < 0.2dB, đảm bảo kết nối mạng quang tốc độ cao." 
              }
            ].map((row, index) => (
              <div key={index} className="bg-[#0f172a] rounded-2xl border border-brand-500/20 overflow-hidden shadow-lg relative pb-1 shrink-0 w-[85vw] snap-center">
                <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-brand-500/50 to-accent-500/50 left-0"></div>
                <div className="bg-slate-800/80 p-3 border-b border-brand-500/30 text-center">
                  <h3 className="text-base font-bold text-white">{row.feature}</h3>
                </div>
                <div className="grid grid-cols-2 divide-x divide-brand-500/10 h-full">
                   <div className="p-4 flex flex-col items-center text-center gap-2 bg-slate-900/50 pb-12">
                     <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Thông Thường</span>
                     <X className="w-5 h-5 text-red-500 opacity-60 shrink-0" />
                     <p className="text-slate-400 text-xs">{row.normal}</p>
                   </div>
                   <div className="p-4 flex flex-col items-center text-center gap-2 bg-brand-900/20 relative pb-12">
                     <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">ODF MAXTEL</span>
                     <CheckCircle2 className="w-5 h-5 text-accent-500 drop-shadow-[0_0_5px_rgba(195,28,36,0.8)] shrink-0" />
                     <p className="text-white text-xs font-medium">{row.maxtel}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block overflow-x-auto pb-4">
            <div className="min-w-[800px] w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(37,166,223,0.15)] border border-brand-500/20">
              {/* Header */}
              <div className="grid grid-cols-12 bg-[#0f172a] border-b border-brand-500/30">
                <div className="col-span-4 p-5 sm:p-6 flex items-center">
                  <span className="text-lg font-bold text-slate-300">Đặc Điểm</span>
                </div>
                <div className="col-span-4 p-5 sm:p-6 flex items-center justify-center border-l bg-slate-900 border-brand-500/10">
                  <span className="text-lg font-medium text-slate-400">Sản Phẩm Thông Thường</span>
                </div>
                <div className="col-span-4 p-5 sm:p-6 flex items-center justify-center border-l border-brand-500/30 bg-brand-900/40 relative">
                  <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brand-500 to-accent-500 left-0"></div>
                  <span className="text-xl font-black text-brand-400 flex items-center gap-2 text-center">
                    <Award className="w-5 h-5 text-accent-500" /> ODF MAXTEL
                  </span>
                </div>
              </div>

              {/* Rows */}
              {[
                { 
                  feature: "Độ dày thép vỏ", 
                  normal: "0.8mm - 1.0mm, mềm, dễ móp méo khi vận chuyển.", 
                  maxtel: "1.2mm - 1.5mm, cứng cáp, chịu lực va đập cực tốt." 
                },
                { 
                  feature: "Lớp sơn bề mặt", 
                  normal: "Sơn phun thông thường, dễ bong tróc, nhanh xuống cấp, gỉ sét.", 
                  maxtel: "Sơn tĩnh điện cao cấp, siêu mịn, chống gỉ sét trên 10 năm." 
                },
                { 
                  feature: "Khay hàn quang", 
                  normal: "Nhựa tái chế giòn, dễ gãy khớp bản lề khi thao tác nhiều.", 
                  maxtel: "Nhựa ABS/PC cao cấp, dẻo dai, chịu nhiệt, bản lề gập mở êm ái." 
                },
                { 
                  feature: "Phụ kiện đi kèm", 
                  normal: "Thường bị bớt hoặc sử dụng phụ kiện (dây, đầu nối) chất lượng kém.", 
                  maxtel: "Full bộ chuẩn chất lượng: Adapter, Pigtail, Khay hàn, Ống co..." 
                },
                { 
                  feature: "Suy hao (Insertion Loss)", 
                  normal: "> 0.3dB, kết nối chập chờn, ảnh hưởng tốc độ mạng.", 
                  maxtel: "Siêu thấp < 0.2dB, đảm bảo kết nối mạng quang tốc độ cao." 
                }
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-12 border-b border-brand-500/10 last:border-b-0 hover:bg-slate-800/50 transition-colors ${index % 2 === 0 ? 'bg-[#020617]/50' : 'bg-[#0f172a]/50'}`}>
                  <div className="col-span-4 p-5 flex items-center">
                    <span className="text-base font-semibold text-white">{row.feature}</span>
                  </div>
                  <div className="col-span-4 p-5 flex items-center justify-center border-l bg-slate-900 border-brand-500/10">
                    <p className="text-slate-400 text-sm text-center flex flex-col items-center gap-2">
                       <X className="w-5 h-5 text-red-500 opacity-60" />
                       {row.normal}
                    </p>
                  </div>
                  <div className="col-span-4 p-5 flex items-center justify-center border-l border-brand-500/30 bg-brand-900/20">
                     <p className="text-white text-sm text-center flex flex-col items-center gap-2 font-medium">
                       <CheckCircle2 className="w-5 h-5 text-accent-500 drop-shadow-[0_0_5px_rgba(195,28,36,0.8)]" />
                       {row.maxtel}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Use Cases */}
      <section className="py-12 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://vienthongxanh.cdn.vccloud.vn/wp-content/uploads/2023/04/cung-cap-hop-phoi-quang-odf-chinh-hang-tai-vien-thong-xanh.jpg')] opacity-10 bg-cover bg-center sm:mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Sự Hài Lòng Từ Thực Tế Công Trường</h2>
            <p className="text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] text-lg">Maxtel tự hào đồng hành cùng các đơn vị thi công trên toàn quốc.</p>
          </div>
          
          <div className="relative flex overflow-x-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] pb-4 pt-2 -mx-4 sm:mx-0">
            <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-normal min-w-max">
              {Array.from({ length: 4 }).flatMap(() => [
                { 
                  name: "Anh Hoàng Quang", 
                  role: "Chỉ Huy Trưởng - VietCom", 
                  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
                  text: "Trước xài ODF giá rẻ toàn bị móp méo lúc vận chuyển, khay hàn thì lỏng lẻo. Từ lúc chuyển qua Maxtel anh em kỹ thuật nhàn hẳn, thi công nhanh, nhìn tủ rack cực kỳ thẩm mỹ và chuyên nghiệp." 
                },
                { 
                  name: "Anh Tuấn Bình", 
                  role: "Kỹ Thuật Viên VNPT", 
                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
                  text: "Là dân kỹ thuật, tôi đánh giá cao độ chính xác của thanh blank và chuẩn adapter đi kèm. Suy hao test qua máy đo luôn đạt chuẩn siêu thấp. Vỏ thép cầm rất đầm tay và cứng cáp." 
                },
                { 
                  name: "Chị Thu Hoa", 
                  role: "Đại Lý Vật Tư Mạng D2", 
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
                  text: "Bán hàng Maxtel rất thích vì chưa thấy khách nào phàn nàn phải bảo hành. Vỏ hộp bọc carton dày dặn, bên trong lót xốp, tem mác và phiếu QC rõ ràng. Khách dự án mua đi mua lại liên tục." 
                },
              ]).map((t, i) => (
                <div key={i} className="mx-4 w-[320px] md:w-[400px] bg-[#0f172a]/60 p-8 rounded-3xl border border-white/20 flex flex-col shrink-0 group hover:border-brand-500/80 hover:bg-[#0f172a] hover:shadow-[0_0_20px_rgba(37,166,223,0.2)] transition-all cursor-pointer">
                  <div className="flex text-yellow-400 mb-6 gap-1 group-hover:scale-105 origin-left transition-transform">
                    {[1,2,3,4,5].map(s => <Star key={`star-${s}`} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-brand-50 text-base leading-relaxed mb-8 flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={t.img} loading="lazy" decoding="async" alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-500 object-cover" />
                    <div>
                      <div className="font-bold text-lg text-white group-hover:text-brand-400 transition-colors">{t.name}</div>
                      <div className="text-sm text-brand-50/80">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 relative flex overflow-x-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] pb-4 pt-2 -mx-4 sm:mx-0">
            <div 
              className="flex animate-marquee hover:[animation-play-state:paused] whitespace-normal min-w-max gap-4 px-4 sm:px-0"
              style={{ animationDuration: '40s' }}
            >
              {Array.from({ length: 4 }).flatMap(() => [
                "https://maxtel.vn/wp-content/uploads/2026/05/thicong1.jpg",
                "https://maxtel.vn/wp-content/uploads/2026/05/thicong2.jpg",
                "https://maxtel.vn/wp-content/uploads/2026/05/thicong3.jpg",
                "https://maxtel.vn/wp-content/uploads/2026/05/thicong4.jpg"
              ]).map((img, i) => (
                 <div 
                   key={i} 
                   className="w-[280px] sm:w-[360px] h-40 sm:h-56 rounded-xl overflow-hidden relative group cursor-pointer shrink-0"
                   onClick={() => setSelectedImage(img)}
                 >
                   <img src={img} loading="lazy" decoding="async" alt="Maxtel in action" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-white font-medium text-sm border border-white/30 px-3 py-1 rounded-full bg-black/40">Phóng to</span>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Lead Generation Form) */}
      <section id="contact-section" className="py-12 md:py-24 relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#0f172a]  rounded-3xl shadow-[0_0_20px_rgba(37,166,223,0.4)] overflow-hidden flex flex-col md:flex-row relative">
            <div className="hidden md:flex md:w-5/12 bg-slate-800/80 backdrop-blur-md p-8 sm:p-10 text-white flex-col justify-between border-r border-slate-700/50">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">ƯU ĐÃI THÁNG NÀY!</h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-6">Nhận bảng giá VIP dành riêng cho đại lý & nhà thầu dự án.</p>
                <div className="flex items-center space-x-3 mb-4 text-xs sm:text-sm font-medium border-b border-slate-700/50 pb-3 sm:pb-4">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 flex-shrink-0" /> <span>Chiết khấu cao nhất thị trường</span>
                </div>
                <div className="flex items-center space-x-3 mb-4 text-xs sm:text-sm font-medium border-b border-slate-700/50 pb-3 sm:pb-4">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 flex-shrink-0" /> <span>Hàng sẵn số lượng lớn tại kho HN & HCM</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm font-medium border-b border-slate-700/50 pb-3 sm:pb-4 min-h-[14px]">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 flex-shrink-0" /> <span>Hỗ trợ kỹ thuật 24/7</span>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-700/50 p-2.5 sm:p-3 rounded-full">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] uppercase tracking-wider">Hotline 24/7</p>
                    <p className="font-bold text-base sm:text-lg">0979.354.796</p>
                    <p className="font-bold text-base sm:text-lg">0973.497.685</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-7/12 p-6 sm:p-10">
              <h3 className="text-2xl font-bold text-white drop-shadow-md mb-6">Đăng Ký Nhận Báo Giá</h3>
              {showModal ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Đăng ký thành công!</h4>
                  <p className="text-brand-50">Chuyên viên của chúng tôi sẽ gọi lại cho bạn trong vòng 5 phút tới.</p>
                  <button onClick={() => setShowModal(false)} className="mt-6 text-brand-500 font-semibold underline">Gửi yêu cầu khác</button>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(true); }}>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-brand-50 mb-1">Họ và tên *</label>
                    <input id="fullName" type="text" required className="w-full px-4 py-3 rounded-lg border border-brand-500/30 focus:ring-2 focus:ring-brand-500 outline-none transition bg-black/20 text-white placeholder:text-slate-500" placeholder="Ví dụ: Nguyễn Văn A" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-50 mb-1">Số điện thoại *</label>
                    <input id="phone" type="tel" required className="w-full px-4 py-3 rounded-lg border border-brand-500/30 focus:ring-2 focus:ring-brand-500 outline-none transition bg-black/20 text-white placeholder:text-slate-500" placeholder="09xxxxxxxx" />
                  </div>
                  <div>
                    <label htmlFor="details" className="block text-sm font-medium text-brand-50 mb-1">Yêu cầu chi tiết</label>
                    <textarea id="details" rows={3} className="w-full px-4 py-3 rounded-lg border border-brand-500/30 focus:ring-2 focus:ring-brand-500 outline-none transition bg-black/20 text-white placeholder:text-slate-500 resize-none" placeholder="Nhập yêu cầu của bạn (số lượng, loại ODF...)"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent-600 hover:bg-accent-500 text-white shadow-[0_0_20px_rgba(195,28,36,0.6)] border border-accent-400/50 font-bold py-4 rounded-lg text-lg transition-transform transform hover:scale-[1.02] shadow-[0_0_15px_rgba(37,166,223,0.3)] shadow-accent-500/30 flex items-center justify-center gap-2 mt-4">
                    Nhận Báo Giá Ngay Vào Zalo
                  </button>
                  <p className="text-xs text-center text-brand-50 mt-4 flex items-center justify-center gap-1"><Clock className="w-3 h-3"/> Cam kết bảo mật thông tin</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img src="https://maxtel.vn/wp-content/uploads/2024/06/cropped-Logo-MAXTEL-3000.png" loading="lazy" decoding="async" alt="MAXTEL Logo" className="h-8 md:h-10 w-auto object-contain" />
            </div>
            <div className="flex flex-col gap-2 mt-4 mb-4 text-brand-50">
              <p className="font-bold text-white">CÔNG TY CỔ PHẦN MAXTEL VIỆT NAM</p>
              <p>MST: 2500681449</p>
            </div>
            <p className="mb-4">Thương hiệu hàng đầu Việt Nam về thiết bị & phụ kiện cáp quang. Mang lại giải pháp thi công hiệu quả, an toàn, chất lượng.</p>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Liên Hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2"><div className="mt-1"><Phone className="w-4 h-4"/></div> 0979.354.796 – 0973.497.685</li>
              <li className="flex items-start gap-2"><div className="mt-1"><Mail className="w-4 h-4"/></div> maxtel.vn@gmail.com</li>
              <li className="flex items-start gap-2 text-brand-50 leading-relaxed mt-2 pt-2 border-t border-brand-500/20">
                 Địa chỉ văn phòng đại diện: Số 2, ngõ 53 Đường Phạm Tuấn Tài, Phường Nghĩa Tân, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Chính Sách</h4>
            <ul className="space-y-4 md:space-y-3">
              <li><a href="#" className="inline-block py-1 hover:text-white transition">Chính sách bảo hành</a></li>
              <li><a href="#" className="inline-block py-1 hover:text-white transition">Chính sách vận chuyển</a></li>
              <li><a href="#" className="inline-block py-1 hover:text-white transition">Đại lý phân phối</a></li>
            </ul>
          </div>
          <div className="md:col-span-1 rounded-xl overflow-hidden h-32 md:h-full min-h-[120px]">
            <iframe 
              src="https://maps.google.com/maps?q=C%C3%94NG+TY+C%E1%BB%94+PH%E1%BA%A6N+MAXTEL+VI%E1%BB%86T+NAM&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Maxtel Location"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-500/20 text-center text-xs">
          © {new Date().getFullYear()} Maxtel. All rights reserved.
        </div>
      </footer>

      {/* Floating Zalo Button Area */}
      <div className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-[60] flex flex-col items-end">
        
        {/* Contact Popup */}
        <div className={`mb-4 sm:mb-6 mr-0 sm:mr-2 transition-all duration-300 transform origin-bottom-right ${showZaloOptions ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-1 w-[320px] sm:w-[380px] border border-gray-100 relative max-h-[80vh] overflow-y-auto">
            {/* Triangle pointing to button */}
            <div className="absolute -bottom-[8px] right-6 sm:right-8 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)] hidden sm:block"></div>
            
            <div className="p-4 sm:p-5 pb-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                  <HeadphonesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-base">Hỗ Trợ Trực Tuyến</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Chat Zalo hoặc gọi Hotline (24/7)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-2 flex flex-col gap-1 mx-2 mb-2 border border-gray-100/50">
              {[
                { name: "Ms. Dung", phone: "0982 960 685", zalo: "0982960685" },
                { name: "Ms. Hồng", phone: "096 191 9559", zalo: "0961919559" },
                { name: "Mr. Sơn", phone: "0973 497 685", zalo: "0973497685" },
                { name: "Mr. Đức Sơn", phone: "096 165 3553", zalo: "0961653553" },
                { name: "Ms. Lan", phone: "098 939 5445", zalo: "0989395445" },
              ].map((contact, idx) => (
                <a 
                  key={idx}
                  href={`https://zalo.me/${contact.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-200 hover:shadow-sm group/item hover:!opacity-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm group-hover/item:scale-110 transition-transform">
                      {contact.name.split('. ')[1]?.charAt(0) || contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-[14px] leading-tight group-hover/item:text-blue-600 transition-colors">{contact.name}</div>
                      <div className="text-gray-500 text-[13px] font-medium tracking-tight mt-0.5 flex flex-wrap gap-1">
                          <span className="text-blue-600">Zalo</span> • 
                          <span className="text-red-500">{contact.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Button */}
        <div className="relative cursor-pointer">
          <div className="absolute inset-0 bg-[#0068FF] rounded-full animate-zalo-ripple"></div>
          <div className="absolute inset-0 bg-[#0068FF] rounded-full animate-zalo-ripple-delayed"></div>
          <button 
            type="button"
            onClick={() => setShowZaloOptions(!showZaloOptions)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#0068FF] rounded-full shadow-[0_0_20px_rgba(0,104,255,0.4)] transition-transform flex items-center justify-center isolate border-2 border-white z-10"
            aria-label="Liên hệ Zalo"
          >
            <span className="font-extrabold text-white text-base sm:text-xl tracking-tight mt-[1px]" style={{ fontFamily: 'sans-serif' }}>Zalo</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0f172a]   border-t border-brand-500/40 z-50 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={scrollToContact}
          className="w-full bg-accent-600 hover:bg-accent-500 text-white shadow-[0_0_20px_rgba(195,28,36,0.6)] border border-accent-400/50 font-bold py-3.5 rounded-xl text-base shadow-[0_0_15px_rgba(37,166,223,0.3)] shadow-accent-500/30 flex items-center justify-center gap-2"
        >
          Nhận Báo Giá Ngay <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              aria-label="Đóng"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Phóng to" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple internal icon for UI element
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
