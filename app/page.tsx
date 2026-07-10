import { Nav } from "@/components/nav";
import { HeroScrub } from "@/components/hero-scrub";
import { Flavors } from "@/components/flavors";
import { Method } from "@/components/method";
import { Order } from "@/components/order";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroScrub />
        <Flavors />
        <Method />
        <Order />
      </main>
      <Footer />
    </>
  );
}
