import Hero from '../components/home/Hero';
import Milestones from '../components/home/Milestones';
import Heritage from '../components/home/Heritage';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Testimonials from '../components/home/Testimonials';
import BlogTeaser from '../components/home/BlogTeaser';
import InstagramFeed from '../components/home/InstagramFeed';

export default function Home() {
    return (
        <div className="home-page">
            <Hero />
            <Milestones />
            <Heritage />
            <FeaturedProperties />
            <Testimonials />
            <BlogTeaser />
            <InstagramFeed />
        </div>
    );
}
