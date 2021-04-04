import Image from 'next/image'

export default function Img({ src, ...props }: any) {
  return <Image src={`/${src}`} {...props} />
}
