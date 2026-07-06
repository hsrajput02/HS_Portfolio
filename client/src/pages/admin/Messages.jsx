import { useEffect, useState } from "react";

import SearchBar from "../../components/admin/common/SearchBar";
import MessagesTable from "../../components/admin/MessagesTable";

import {
  getMessages,
} from "../../services/messageService";

function Messages() {

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const loadMessages = async () => {

    try {

      const res = await getMessages();

      setMessages(res.data.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadMessages();

  }, []);

  const filteredMessages = messages.filter((message) =>

    message.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    message.email
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    message.subject
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <>

      <SearchBar

        value={search}

        onChange={setSearch}

        placeholder="Search Messages..."

      />

      <MessagesTable

        messages={filteredMessages}

        refresh={loadMessages}

      />

    </>

  );

}

export default Messages;