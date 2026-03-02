

const Hero = () => {
    return (
        <section className="bg-white dark:bg-gray-900 py-15 px-4 text-center my-10 md:my-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Welcome to <span className="text-blue-600">Nextgram</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                    Inspired by Instagram, <strong>Nextgram</strong> is a clean and minimal social feed built with modern web technologies. Whether you&apos;re sharing moments or exploring posts from others, Nextgram keeps it fast, focused, and familiar.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
                    Powered by Next.js, Tailwind CSS, and a passion for simplicity.
                </p>
                <a href="/feed" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Explore the Feed
                </a>
            </div>
        </section>

    )
}

export default Hero