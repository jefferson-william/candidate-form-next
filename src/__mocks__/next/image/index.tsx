import Image from 'next/image'

export default function ({ src, ...props }: any) {
  return <Image src={`/${src}`} {...props} />
}
