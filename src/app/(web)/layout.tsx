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
