/*
==========================================================
Source by PBL
PBL | HOME Source v2.0
View source đi trước khi bị đóng :>
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================
  // DOM ELEMENTS
  // ==========================================================

  const chatBody = document.querySelector(".chat-body");
  const messageInput = document.querySelector(".message-input");
  const sendMessageButton = document.querySelector("#send-message");
  const fileInput = document.querySelector("#file-input");
  const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
  const fileCancelButton = document.querySelector("#file-cancel");
  const chatbotToggler = document.querySelector("#chatbot-toggler");
  const closeChatbot = document.querySelector("#close-chatbot");
  const scrollToBottomBtn = document.querySelector("#scroll-to-bottom");

  // ==========================================================
  // GEMINI API KEY 
  // ==========================================================
  
  const API_KEY = "AQ.Ab8RN6JEMdxDVmxTzC7Cd-euDHfjnFyPNfjJC2m6uOKrftnHDQ";

  // Gemini REST API
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent";

  // ==========================================================
  // USER DATA
  // ==========================================================

  const userData = {
    message: null,
    file: {
      data: null,
      mime_type: null,
    },
  };

  let isAutoScrolling = false;
  let isScrollingToBottomRequested = false;
  let isBotResponding = false;

  // ==========================================================
  // CHECK REQUIRED ELEMENTS
  // ==========================================================

  if (
    !chatBody ||
    !messageInput ||
    !sendMessageButton ||
    !fileInput ||
    !fileUploadWrapper ||
    !fileCancelButton ||
    !chatbotToggler ||
    !closeChatbot ||
    !scrollToBottomBtn
  ) {
    console.error(
      "Chatbot: Không tìm thấy đầy đủ các phần tử HTML cần thiết."
    );
    return;
  }

  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  function updateSendButtonState() {
    const isValidMessage = messageInput.value.trim().length > 0;

    sendMessageButton.style.display =
      isValidMessage && !isBotResponding ? "block" : "none";

    sendMessageButton.disabled = isBotResponding;
  }

  // ==========================================================
  // SCROLL HANDLING
  // ==========================================================

  chatBody.addEventListener("scroll", () => {
    if (isScrollingToBottomRequested) {
      scrollToBottomBtn.classList.remove("show");
      return;
    }

    if (!isAutoScrolling) {
      const isScrolledToBottom =
        chatBody.scrollHeight - chatBody.scrollTop <=
        chatBody.clientHeight + 100;

      if (!isScrolledToBottom) {
        scrollToBottomBtn.classList.add("show");
      } else {
        scrollToBottomBtn.classList.remove("show");
      }
    }
  });

  scrollToBottomBtn.addEventListener("click", () => {
    scrollToBottomBtn.classList.remove("show");

    isAutoScrolling = true;
    isScrollingToBottomRequested = true;

    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: "smooth",
    });

    setTimeout(() => {
      isAutoScrolling = false;

      setTimeout(() => {
        isScrollingToBottomRequested = false;
      }, 100);
    }, 500);
  });

  // ==========================================================
  // GEMINI CHAT HISTORY
  // ==========================================================

  const chatHistory = [
    {
      role: "model",
      parts: [
        {
          text: `Giới thiệu:

Chào mừng bạn đến với trợ lý ảo được xây dựng dựa trên thông tin về Phạm Bảo Long,
một tài năng trẻ đầy triển vọng trong lĩnh vực Công nghệ Thông tin. Tôi được tạo ra để cung cấp cho bạn cái nhìn toàn diện về con người,
hành trình học tập, những kỹ năng chuyên môn ấn tượng và vô số dự án sáng tạo mà Long đã và đang thực hiện.
Hãy khám phá thế giới công nghệ đầy đam mê mà Long đang theo đuổi.

Chi tiết:

Sinh ra và lớn lên tại mảnh đất Hưng Yên giàu truyền thống,
Phạm Bảo Long từ nhỏ đã sớm bộc lộ sự tò mò và niềm yêu thích đặc biệt đối với các thiết bị điện tử.
Những món đồ quen thuộc trong gia đình như chiếc vợt bắt muỗi phát ra tia điện, chiếc máy cassette
cũ kỹ với những cuộn băng nhạc, hay những chiếc điện thoại "cục gạch" bền bỉ đã trở thành nguồn cảm hứng bất tận,
thôi thúc Long khám phá cấu trúc bên trong và nguyên lý hoạt động kỳ diệu của chúng.

Bước ngoặt đến với Long khi bắt đầu khám phá thế giới lập trình.
Trong khoảng thời gian học tập và tự tìm tòi,
Long đã học HTML và CSS thông qua các khóa học trực tuyến miễn phí, đặt nền móng cho hành trình chinh phục những dòng code.

Sự đam mê và tinh thần tự học không ngừng đã dẫn lối Long đến với JavaScript và PHP,
mở ra những cánh cửa mới trong thế giới phát triển web.

Những dự án nhỏ ban đầu chính là "sân tập" lý tưởng để Long rèn luyện kỹ năng và hiện thực hóa những kiến thức đã học.
Từ việc xây dựng trang web cá nhân đến việc phát triển những công cụ nhỏ nhưng hữu ích,
mỗi dự án đều là một bước tiến quan trọng trên con đường trở thành một lập trình viên chuyên nghiệp.

Long có thế mạnh ở lĩnh vực phát triển web, đặc biệt là HTML, CSS, JavaScript và PHP.
Long cũng có kinh nghiệm làm việc với Python, MySQL, MongoDB, SQLite, Git, GitHub và Visual Studio Code.

Về Front end, Long sử dụng HTML5, CSS3 và JavaScript để xây dựng giao diện trực quan,
đẹp mắt và có tính tương tác.

Long cũng có kinh nghiệm với các công cụ thiết kế như Figma và Photoshop.

Long từng thực hiện nhiều dự án cá nhân như website profile,
mini game JavaScript, công cụ QR Code, website thời tiết,
các công cụ web và nhiều dự án thử nghiệm công nghệ khác.

Long sử dụng Git và GitHub để quản lý mã nguồn và cộng tác trong các dự án.

Website profile chính:
phambaolongdev.github.io

GitHub:
github.com/phambaolongdev

Telegram:
t.me/pbl_96

Facebook:
facebook.com/PhamBaoLongzz

Instagram:
instagram.com/phambaolng

YouTube:
youtube.com/@pbl.6789

Hãy trả lời người dùng dựa trên những thông tin trên.
Nếu câu hỏi không liên quan đến Phạm Bảo Long, bạn vẫn có thể trả lời bình thường bằng kiến thức của mình.

Luôn trả lời bằng tiếng Việt nếu người dùng đang sử dụng tiếng Việt.
Phong cách trả lời thân thiện, tự nhiên, ngắn gọn và dễ hiểu.`,
        },
      ],
    },
  ];

  // ==========================================================
  // INITIAL INPUT HEIGHT
  // ==========================================================

  const initialInputHeight = messageInput.scrollHeight;

  // ==========================================================
  // CREATE MESSAGE ELEMENT
  // ==========================================================

  const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");

    div.classList.add("message", ...classes);

    div.innerHTML = content;

    return div;
  };

  // ==========================================================
  // NOTIFICATION SOUND
  // ==========================================================

  const notificationSound = new Audio(
    "./assets/sounds/notification-sound-effect.mp3"
  );

  notificationSound.volume = 1.0;

  // ==========================================================
  // MARKDOWN TO HTML
  // ==========================================================

  function markdownToHTML(text) {
    if (!text) return "";

    let html = text
      // Code block
      .replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const safeCode = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        return `<pre><code class="language-${
          lang || ""
        }">${safeCode}</code></pre>`;
      })

      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")

      // Headings
      .replace(/^###### (.*$)/gm, "<h6>$1</h6>")
      .replace(/^##### (.*$)/gm, "<h5>$1</h5>")
      .replace(/^#### (.*$)/gm, "<h4>$1</h4>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")

      // Lists
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
      .replace(/^[-*] (.*$)/gm, "<li>$1</li>")

      // Formatting
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>")

      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )

      // Images
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" style="max-width:100%;"/>'
      )

      // Blockquote
      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")

      // Horizontal rule
      .replace(/^\-\-\-$/gm, "<hr/>");

    // Convert list groups
    html = html.replace(/(<li>.*<\/li>)+/gms, (m) => {
      if (m.includes("<ol>") || m.includes("<ul>")) {
        return m;
      }

      return `<ul>${m}</ul>`;
    });

    // Paragraphs and line breaks
    html = html
      .replace(/\n{2,}/g, "</p><p>")
      .replace(/\n/g, "<br/>");

    return html;
  }

  // ==========================================================
  // ESCAPE HTML
  // ==========================================================

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================================
  // FORMAT TIME
  // ==========================================================

  function formatTime(date = new Date()) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  // ==========================================================
  // RESET FILE
  // ==========================================================

  function resetFileInput() {
    fileInput.value = "";

    fileUploadWrapper.classList.remove("file-uploaded");

    const previewImage = fileUploadWrapper.querySelector("img");

    if (previewImage) {
      previewImage.src = "#";
    }

    userData.file = {
      data: null,
      mime_type: null,
    };
  }

  // ==========================================================
  // GENERATE BOT RESPONSE
  // ==========================================================

  const generateBotResponse = async (incomingMessageDiv) => {
    isBotResponding = true;
    updateSendButtonState();

    const messageElement =
      incomingMessageDiv.querySelector(".message-text");

    try {
      // --------------------------------------------------------
      // Add user message to history
      // --------------------------------------------------------

      const userParts = [];

      if (userData.message) {
        userParts.push({
          text: userData.message,
        });
      }

      if (userData.file?.data && userData.file?.mime_type) {
        userParts.push({
          inline_data: {
            mime_type: userData.file.mime_type,
            data: userData.file.data,
          },
        });
      }

      chatHistory.push({
        role: "user",
        parts: userParts,
      });

      // --------------------------------------------------------
      // Request options
      // --------------------------------------------------------

      const requestOptions = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          // IMPORTANT:
          // Gemini API key is sent through this header.
          "x-goog-api-key": API_KEY,
        },

        body: JSON.stringify({
          contents: chatHistory,
        }),
      };

      // --------------------------------------------------------
      // Send request
      // --------------------------------------------------------

      const response = await fetch(API_URL, requestOptions);

      let data;

      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error(
          `Gemini trả về dữ liệu không hợp lệ. HTTP ${response.status}`
        );
      }

      // Debug
      console.log("Gemini API response:", data);

      // --------------------------------------------------------
      // Handle API errors
      // --------------------------------------------------------

      if (!response.ok) {
        const apiError =
          data?.error?.message ||
          `Gemini API lỗi HTTP ${response.status}`;

        throw new Error(apiError);
      }

      // --------------------------------------------------------
      // Get response text safely
      // --------------------------------------------------------

      const apiResponseText =
        data?.candidates?.[0]?.content?.parts
          ?.map((part) => part?.text || "")
          .join("")
          .trim();

      if (!apiResponseText) {
        console.error("Gemini không trả về text:", data);

        // Check blocked response
        if (data?.promptFeedback?.blockReason) {
          throw new Error(
            `Gemini đã chặn yêu cầu: ${data.promptFeedback.blockReason}`
          );
        }

        if (data?.candidates?.[0]?.finishReason) {
          throw new Error(
            `Gemini không tạo được câu trả lời. Lý do: ${data.candidates[0].finishReason}`
          );
        }

        throw new Error(
          "Gemini không trả về nội dung. Hãy mở F12 → Console để kiểm tra."
        );
      }

      // --------------------------------------------------------
      // Convert Markdown
      // --------------------------------------------------------

      const htmlResponse = markdownToHTML(apiResponseText);

      // --------------------------------------------------------
      // Play notification sound
      // --------------------------------------------------------

      notificationSound.currentTime = 0;

      notificationSound.play().catch(() => {});

      // --------------------------------------------------------
      // Display response
      // --------------------------------------------------------

      messageElement.innerHTML =
        `${htmlResponse}` +
        `<span class="message-time">${formatTime()}</span>`;

      // --------------------------------------------------------
      // Add model response to history
      // --------------------------------------------------------

      chatHistory.push({
        role: "model",
        parts: [
          {
            text: apiResponseText,
          },
        ],
      });
    } catch (error) {
      console.error("Gemini Chatbot Error:", error);

      messageElement.innerHTML = `
        <span style="color:#ff0000;">
          ${escapeHTML(error.message || "Đã xảy ra lỗi.")}
        </span>
        <span class="message-time">${formatTime()}</span>
      `;
    } finally {
      isBotResponding = false;

      updateSendButtonState();

      resetFileInput();

      incomingMessageDiv.classList.remove("thinking");

      // Scroll bottom
      isAutoScrolling = true;
      isScrollingToBottomRequested = true;

      scrollToBottomBtn.classList.remove("show");

      chatBody.scrollTo({
        behavior: "smooth",
        top: chatBody.scrollHeight,
      });

      setTimeout(() => {
        isAutoScrolling = false;

        setTimeout(() => {
          isScrollingToBottomRequested = false;
        }, 100);
      }, 500);
    }
  };

  // ==========================================================
  // HANDLE OUTGOING MESSAGE
  // ==========================================================

  const handleOutgoingMessage = (e) => {
    e.preventDefault();

    if (isBotResponding) return;

    const message = messageInput.value.trim();

    if (!message && !userData.file?.data) {
      return;
    }

    userData.message = message;

    messageInput.value = "";

    fileUploadWrapper.classList.remove("file-uploaded");

    messageInput.dispatchEvent(new Event("input"));

    // --------------------------------------------------------
    // User message
    // --------------------------------------------------------

    const messageContent = `
      <div class="message-text"></div>
      ${
        userData.file?.data
          ? `<img 
              src="data:${userData.file.mime_type};base64,${userData.file.data}" 
              class="attachment" 
              alt="attachment"
            />`
          : ""
      }
    `;

    const outgoingMessageDiv = createMessageElement(
      messageContent,
      "user-message"
    );

    outgoingMessageDiv.querySelector(".message-text").innerHTML =
      `${escapeHTML(userData.message)}` +
      `<span class="message-time">${formatTime()}</span>`;

    chatBody.appendChild(outgoingMessageDiv);

    chatBody.scrollTop = chatBody.scrollHeight;

    // --------------------------------------------------------
    // Bot thinking
    // --------------------------------------------------------

    setTimeout(() => {
      const messageContent = `
        <svg 
          class="bot-avatar" 
          xmlns="http://www.w3.org/2000/svg" 
          width="50" 
          height="50" 
          viewBox="0 0 1024 1024"
        >
          <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-53.5 53.5-53.5h26.5v191.3h-26.5c-19.4 0-35.1-47.8-35.1-106.9zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
          </path>
        </svg>

        <div class="message-text">
          <div class="thinking-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      `;

      const incomingMessageDiv = createMessageElement(
        messageContent,
        "bot-message",
        "thinking"
      );

      chatBody.appendChild(incomingMessageDiv);

      isAutoScrolling = true;
      isScrollingToBottomRequested = true;

      scrollToBottomBtn.classList.remove("show");

      chatBody.scrollTo({
        behavior: "smooth",
        top: chatBody.scrollHeight,
      });

      setTimeout(() => {
        isAutoScrolling = false;
        isScrollingToBottomRequested = false;
      }, 500);

      generateBotResponse(incomingMessageDiv);
    }, 600);
  };

  // ==========================================================
  // ENTER TO SEND
  // ==========================================================

  messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();

    if (
      e.key === "Enter" &&
      userMessage &&
      !e.shiftKey &&
      window.innerWidth > 768 &&
      !isBotResponding
    ) {
      handleOutgoingMessage(e);
    }
  });

  // ==========================================================
  // MESSAGE INPUT
  // ==========================================================

  messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;

    messageInput.style.height = `${messageInput.scrollHeight}px`;

    const chatForm = document.querySelector(".chat-form");

    if (chatForm) {
      chatForm.style.borderRadius =
        messageInput.scrollHeight > initialInputHeight
          ? "15px"
          : "32px";
    }

    updateSendButtonState();
  });

  // ==========================================================
  // FILE UPLOAD
  // ==========================================================

  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!validImageTypes.includes(file.type)) {
      if (typeof Swal !== "undefined") {
        await Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WEBP)",
          confirmButtonText: "OK",
        });
      } else {
        alert(
          "Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WEBP)"
        );
      }

      resetFileInput();
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const previewImage = fileUploadWrapper.querySelector("img");

      if (previewImage) {
        previewImage.src = event.target.result;
      }

      fileUploadWrapper.classList.add("file-uploaded");

      const base64String =
        event.target.result.split(",")[1];

      userData.file = {
        data: base64String,
        mime_type: file.type,
      };

      // Cho phép chọn lại cùng file
      fileInput.value = "";

      updateSendButtonState();
    };

    reader.onerror = () => {
      console.error("Không thể đọc file.");

      resetFileInput();
    };

    reader.readAsDataURL(file);
  });

  // ==========================================================
  // CANCEL FILE
  // ==========================================================

  fileCancelButton.addEventListener("click", (e) => {
    e.preventDefault();

    resetFileInput();

    updateSendButtonState();
  });

  // ==========================================================
  // EMOJI PICKER
  // ==========================================================

  if (
    typeof EmojiMart !== "undefined" &&
    EmojiMart.Picker
  ) {
    const picker = new EmojiMart.Picker({
      theme: "auto",
      showSkinTones: "none",
      previewPosition: "none",

      onEmojiSelect: (emoji) => {
        const {
          selectionStart: start,
          selectionEnd: end,
        } = messageInput;

        messageInput.setRangeText(
          emoji.native,
          start,
          end,
          "end"
        );

        messageInput.focus();

        updateSendButtonState();
      },

      onClickOutside: (e) => {
        if (e.target.id === "emoji-picker") {
          document.body.classList.toggle(
            "show-emoji-picker"
          );
        } else {
          document.body.classList.remove(
            "show-emoji-picker"
          );
        }
      },
    });

    const chatForm = document.querySelector(".chat-form");

    if (chatForm) {
      chatForm.appendChild(picker);
    }
  }

  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  sendMessageButton.addEventListener("click", (e) => {
    if (!isBotResponding) {
      handleOutgoingMessage(e);
    }
  });

  // ==========================================================
  // FILE UPLOAD BUTTON
  // ==========================================================

  const fileUploadButton =
    document.querySelector("#file-upload");

  if (fileUploadButton) {
    fileUploadButton.addEventListener("click", (e) => {
      e.preventDefault();
      fileInput.click();
    });
  }

  // ==========================================================
  // CHATBOT OPEN / CLOSE
  // ==========================================================

  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
  });

  closeChatbot.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
  });

  // ==========================================================
  // INITIAL STATE
  // ==========================================================

  updateSendButtonState();

  console.log("PBL Chatbot loaded successfully.");
});


// ============================================================
// PROJECT BUTTON CLICK SOUND
// ============================================================

document.querySelectorAll(".projects__button").forEach((button) => {
  button.addEventListener("click", () => {
    const audio = new Audio(
      "./assets/sounds/click.mp3"
    );

    audio.volume = 0.5;

    audio.play().catch(() => {});
  });
});


// ============================================================
// CHATBOT BUTTON SOUND
// ============================================================

const chatbotToggler =
  document.getElementById("chatbot-toggler");

if (chatbotToggler) {
  const chatbotSound = new Audio(
    "./assets/sounds/botclick.mp3"
  );

  chatbotSound.volume = 0.5;

  chatbotToggler.addEventListener("click", () => {
    chatbotSound.currentTime = 0;

    chatbotSound.play().catch(() => {});
  });
}
