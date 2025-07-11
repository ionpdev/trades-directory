const FooterSection = () => {
  return (
    <footer className="bg-background border-t py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">TradesDirectory</h3>
        <p className="text-muted-foreground mb-8">
          Your trusted platform for finding verified tradespeople across the UK.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            About Us
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          © 2025 TradesDirectory. Demo App
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
