import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import CommentForm from "@/components/contact/components/CommentForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-softGreen">
      <Header />
      <CommentForm />
      <Footer />
    </div>
  );
}
