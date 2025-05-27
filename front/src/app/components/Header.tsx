import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
        <div>
            <Image
                src="/logo.png"
                alt=""
                width={358}
                height={71}
                className='mt-[14px] mb-[14px] mx-auto'
            />
        </div>
        <div className='bg-[#0067B1] h-[55px] pl-[80px] pr-[80px] pt-[16px] pb-[16px] sticky top-0 z-50'>
            <nav className="flex items-center w-full">
              <a href="https://www.dvfu.ru/about/" target="_blank" rel="noopener noreferrer" className='text-[#AED6EF] hover:underline'>Об Университете</a>
              <Link href="/about" className="text-[#AED6EF] hover:underline ml-auto">О нас</Link>
            </nav>
        </div>
    </header>
  )
}
