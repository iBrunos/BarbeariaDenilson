"use client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter, usePathname } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className="">
      <section>
        <div>
          <Image/>
        </div>
        <div>
          <h3>Marque o seu agendamento ainda hoje</h3>
          <a href="schedule">
            Agendar
          </a>
          <a href="schedule">
            Agendar sem uma conta
          </a>
        </div>
      </section>
    </main>
  )
}
