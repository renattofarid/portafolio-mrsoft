import { Footer } from "react-day-picker";
import Header from "./home/header";
import Thumbnail from "./Thumbnail";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === "production";
  return (
    <div>
      <Header />
      <div className="px-5 md:px-0 max-w-4xl mx-auto prose dark:prose-invert">
        <Thumbnail />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
