import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import Searchbar from '@/components/Searchbar'
import { getAllProducts } from '@/lib/actions'
import Image from 'next/image'

// Home page componant creation

const Home = async () => {
  const allProducts = await getAllProducts();


  return (
    <>
      <section className="px-6 md:px20 py-24 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-sky-700 text-sm" style={{ display: 'inline-flex' }}>
              Begin your intelligent shopping journey here:
              <Image
                src="/assets/icons/down-arrow.svg"
                alt="arrow-right"
                width={16}
                height={16}
                className="ml-2"
              />
            </p>
            <h1 className="head-text">
              Unlock the Strength of
              <span className="text-sky-700"> PricePal</span>
            </h1>

            <p className="mt-6">
              Robust, self-service product and analytics to help you track and trace and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section >

      <section className="trending-section ">
        <h2 className="section-text">Products you followed</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home