'use client'

import Image from 'next/image'
import { FiUser, FiLink, FiTerminal } from 'react-icons/fi'

export default function AboutPage() {
  return (
    <div>
        <main className="min-h-screen bg-[#F5FAFD] px-4 md:px-[80px] pt-[40px] pb-[60px]">
            <h1 className="text-[40px] font-bold text-[#0067BA] mb-[40px] text-center font-montserrat"> О нас</h1>
            <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col md:flex-row items-center gap-6 bg-[#E6EFF6] p-6 rounded-[20px]">
                    <div className="w-full md:w-1/2">
                        <Image
                        src="/about1.jpg"
                        alt="О проекте"
                        width={600}
                        height={400}
                        className="rounded-[20px] w-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-[28px] font-bold text-[#0067BA] font-montserrat mb-2">О проекте</h2>
                        <p className="text-[18px] text-black leading-relaxed">Данный проект был создан в рамках весенней проектной школы ДВФУ.</p>
                    </div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row items-center gap-6 bg-[#E6EFF6] p-6 rounded-[20px]">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-[28px] font-bold text-[#0067BA] font-montserrat mb-4">Команда</h2>
                        <p className="text-[18px] text-black leading-relaxed mb-4">
                            Над проектом работала команда <span className="font-semibold text-[#0067BA]">Hack US</span></p>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white rounded-[16px] p-4 shadow-md">
                            <p className="text-[18px] font-semibold text-[#0067BA]">Кириллов Олег</p>
                            <p className="text-[16px] text-gray-700">DevOps / Инфраструктура</p>
                            </div>
                            <div className="bg-white rounded-[16px] p-4 shadow-md">
                            <p className="text-[18px] font-semibold text-[#0067BA]">Прокопенко Сергей</p>
                            <p className="text-[16px] text-gray-700">Backend / API / База данных</p>
                            </div>
                            <div className="bg-white rounded-[16px] p-4 shadow-md">
                            <p className="text-[18px] font-semibold text-[#0067BA]">Улько Данила</p>
                            <p className="text-[16px] text-gray-700">Frontend / UI-дизайн</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image
                        src="/about2.jpg"
                        alt="Команда"
                        width={600}
                        height={400}
                        className="rounded-[20px] w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </main>
        <footer className="bg-[#E6EFF6] border-t-2 border-[#CCD7E0] w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 px-4 md:px-[80px] py-4 md:h-[130px]">
        <div className="text-sm text-black">© 2025</div>

        <div className="shadow-md px-4 py-2 text-sm text-black rounded bg-white w-full md:w-[290px]">
            <p className="font-semibold mb-2">Контактные данные</p>
            <div className="flex flex-col gap-2 text-[#0067BA]">
            <a href="https://t.me/ProkopenkoSR" className="flex items-center gap-2 hover:underline">
                <FiUser />
                <span>Telegram</span>
            </a>
            <a href="https://github.com/serptid/VND" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <FiLink />
                <span>GitHub</span>
            </a>
            <a href="https://t.me/imctech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <FiTerminal />
                <span>IMTech</span>
            </a>
            </div>
        </div>
        </footer>
    </div>
  )
}
