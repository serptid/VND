import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <div>
        <nav className="relative flex items-center w-full h-[100px]">
          <a
            href="https://esa.dvfu.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-[#428BCA] hover:underline absolute left-0 z-10 pl-[80px]"
          >
            Личный кабинет
          </a>
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 mt-[14px] mb-[14px] z-0">
            <Image
              src="/logo.png"
              alt=""
              width={358}
              height={71}
              className=""
            />
          </Link>
        </nav>
      </div>
        <div className='bg-[#0067B1] h-[35px] pl-[80px] pr-[80px] flex items-center sticky top-0 z-50'>
            <nav className="flex items-center w-full">
              <a href="https://www.dvfu.ru/about/" target="_blank" rel="noopener noreferrer" className='text-[#AED6EF] hover:underline'>Об Университете</a>
              <Link href="/about" className="text-[#AED6EF] hover:underline ml-auto">О нас</Link>
            </nav>
        </div>
    </header>
  )
}
