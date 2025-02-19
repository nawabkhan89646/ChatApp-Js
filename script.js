document.addEventListener("DOMContentLoaded", function () {
    fetch("chats.json")
      .then(response => response.json())
      .then(data => {
        const chatList = document.getElementById("chat-list");
        const chatDetails = document.getElementById("chat-details");
        
        function loadChatSessions() {
          chatList.innerHTML = data.chats.map((chat, index) => `
            <div class="chat-item flex items-center p-2 cursor-pointer hover:bg-teal-700 rounded-lg mb-2" data-index="${index}">
              <img class="w-12 h-12 rounded-full mr-4" src="${chat.profile}" alt="${chat.name}">
              <div>
                <h2 class="font-bold">${chat.name}</h2>
                <p class="text-sm">${chat.messages[0]?.text.substring(0, 30)}...</p>
              </div>
            </div>
          `).join("");
        }

        function updateChatDetails(index) {
          const chat = data.chats[index];
          chatDetails.innerHTML = `
            <div class="flex items-center mb-4">
              <img class="w-16 h-16 rounded-full mr-4" src="${chat.profile}" alt="${chat.name}">
              <div>
                <h2 class="text-xl font-bold">${chat.name}</h2>
              </div>
            </div>
            <div class="chat-messages">
              ${chat.messages.map(msg => `
                <div class="${msg.type === "sent" ? "bg-teal-500 text-white" : "bg-gray-100"} p-4 rounded-lg mb-2">
                  <p>${msg.text}</p>
                </div>
              `).join("")}
            </div>
          `;
        }

        chatList.addEventListener("click", function (e) {
          const chatItem = e.target.closest(".chat-item");
          if (chatItem) {
            updateChatDetails(chatItem.getAttribute("data-index"));
          }
        });
        
        loadChatSessions();
      });
  });
