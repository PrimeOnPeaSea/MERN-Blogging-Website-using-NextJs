"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import type { User } from "@/lib/types";

const Writer = ({ id }: { id: string }) => {
  const [writer, setWriter] = useState<User | null>(null);

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/blogs/user/${id}`
        );
        setWriter(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWriter();
  }, [id]);

  return <>{writer?.name}</>;
};

export default Writer;
