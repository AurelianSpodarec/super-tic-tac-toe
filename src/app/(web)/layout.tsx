import WebFooter from "./_components/Footer"
import WebHeader from "./_components/Header"

function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black h-full">
      {/* <WebHeader /> */}
      {children}
      {/* <WebFooter /> */}
    </div>
  )
}

export default WebLayout
