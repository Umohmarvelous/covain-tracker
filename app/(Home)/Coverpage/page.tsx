"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, CreditCard, BarChart3, PieChart } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { CounterAnimation } from "@/components/counter-animation"
import Image from "next/image"

export default function CoverPage() {

    return (
        <div className="flex min-h-screen flex-col">
            <Image src={require('@/assets/images/bgCover03.jpeg')} alt="Background-image"
                className="bg-back "
            />
            <header className="hide-top px-10 sticky top-0 z-100 w-full ">
                <div className="container flex h-16 items-center justify-between pt-15">
                    <div className="flex items-center gap-2 ">
                        <div className="h-8 w-8 rounded-full  flex items-center justify-center">
                            <p className="text-2xl font-bold text-emerald-400">C.</p>
                        </div>
                        {/* <span className="text-lg font-medium text-white">
                            Covain Finance
                        </span> */}
                    </div>
                    <nav className="hidden md:flex items-center gap-6 ml-25">
                        <Link href="#section1" className="text-sm font-medium text-gray-300 hover:text-emerald-500">
                            Features
                        </Link>
                        <Link href="#section2" className="text-sm font-medium text-gray-300 hover:text-emerald-500">
                            Pricing
                        </Link>
                        <Link href="#section3" className="text-sm font-medium text-gray-300 hover:text-emerald-500">
                            About
                        </Link>
                        <Link href="#section4" className="text-sm font-medium text-gray-300 hover:text-emerald-500">
                            Contact
                        </Link>
                    </nav>
                    <div>
                        <Link href="/customPage/Dashboard" className=" bg-emerald-300 p-3 text-sm text-black hover:text-white">
                            Go to Dashboard
                        </Link>

                    </div>

                </div>
            </header>
            <main className="flex flex-col">
                <section className="h-screen hide relative overflow-hidden py-40">
                    <div className="container flex flex-col self-center justify-center text-center lg:flex-row gap-12">
                        <AnimateOnScroll animation="fadeInLeft" className="max-w-xl space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                                Your personal finances <br />
                                made easier
                            </h1>
                            <div className="flex gap-8 text-lg text-center flex justify-center">
                                <div>
                                    <span className="block text-3xl font-bold text-emerald-500">
                                        <CounterAnimation end={55} suffix="%" />
                                    </span>
                                    <span className="text-gray-200">Save more</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold text-emerald-500">
                                        <CounterAnimation end={62} suffix="%" />
                                    </span>
                                    <span className="text-gray-200">Grow faster</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-center">

                                <Link
                                    className="bg-emerald-500 hover:bg-emerald-300 px-20 py-5"
                                    href="/customPage/Dashboard">Get started</Link>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </section>

                <section id="section1" className="px-20 py-40 pb-50 bg-black">
                    <AnimateOnScroll animation="fadeInUp" className="container text-center mb-12">
                        <h2 className="text-3xl text-white font-bold mb-4">What you discover on everyday basis</h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="stagger" className="container grid md:grid-cols-3 gap-8">
                        <div className="rounded-xl bg-emerald-50 p-8 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                                <CreditCard className="h-6 w-6 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-medium">Smart budgeting</h3>
                            <p className="text-gray-600">Automatically categorize your spending and set budgets that work</p>
                        </div>
                        <div className="rounded-xl bg-purple-50 p-8 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-medium">Expense tracking</h3>
                            <p className="text-gray-600">See where your money goes with detailed spending insights</p>
                        </div>
                        <div className="rounded-xl bg-amber-50 p-8 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                <PieChart className="h-6 w-6 text-amber-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-medium">Financial goals</h3>
                            <p className="text-gray-600">Set and track your savings goals with visual progress indicators</p>
                        </div>
                    </AnimateOnScroll>
                </section>

                <section id="section2" className="px-20 py-40 bg-gray-100">
                    <div className="container">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <AnimateOnScroll animation="fadeInLeft" className="max-w-xl space-y-6">
                                <h2 className="text-3xl font-bold">Manage your money smarter, simply and fast</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="rounded-full bg-emerald-100 p-1">
                                            <ChevronRight className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Connect all your accounts</h3>
                                            <p className="text-gray-600">
                                                Link your bank accounts, credit cards, and investments in one place
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="rounded-full bg-emerald-100 p-1">
                                            <ChevronRight className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Automatic categorization</h3>
                                            <p className="text-gray-600">Your transactions are automatically sorted into categories</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="rounded-full bg-emerald-100 p-1">
                                            <ChevronRight className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Real-time notifications</h3>
                                            <p className="text-gray-600">Get alerts for unusual spending and upcoming bills</p>
                                        </div>
                                    </li>
                                </ul>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="fadeInRight" className="relative w-full max-w-md">
                                <div className="grid grid-cols-2 gap-4">
                                    <AnimateOnScroll animation="scale" delay={0.1} className="rounded-xl bg-black p-4 text-white">
                                        <h4 className="text-sm font-medium">Total Balance</h4>
                                        <p className="text-2xl font-bold">₦22,980</p>
                                    </AnimateOnScroll>
                                    <AnimateOnScroll animation="scale" delay={0.2} className="rounded-xl bg-emerald-100 p-4">
                                        <h4 className="text-sm font-medium">Savings</h4>
                                        <p className="text-2xl font-bold">₦4,250</p>
                                    </AnimateOnScroll>
                                    <AnimateOnScroll animation="scale" delay={0.3} className="rounded-xl bg-purple-100 p-4">
                                        <h4 className="text-sm font-medium">Expenses</h4>
                                        <p className="text-2xl font-bold">₦1,180</p>
                                    </AnimateOnScroll>
                                    <AnimateOnScroll animation="scale" delay={0.4} className="rounded-xl bg-pink-100 p-4">
                                        <h4 className="text-sm font-medium">Investments</h4>
                                        <p className="text-2xl font-bold">₦7,150</p>
                                    </AnimateOnScroll>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                <section id="section3" className=" px-20 pb-30 py-20 bg-gray-100">
                    <div className="container">
                        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
                            <AnimateOnScroll animation="fadeInLeft" className="relative w-full max-w-md">
                                <Image
                                    src={require('@/assets/images/bgCover02.jpeg')}
                                    alt="Mobile app interface showing financial dashboard"
                                    width={500}
                                    height={600}
                                    className="relative z-10 rounded-3xl"
                                    priority
                                />
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="fadeInRight" className="max-w-xl space-y-6">
                                <h2 className="text-3xl font-bold">Control and manage your finances</h2>
                                <p className="text-gray-600">
                                    Take control of your financial life with powerful tools that help you track spending, save more, and
                                    reach your goals faster.
                                </p>
                                <Button className="bg-emerald-500 hover:bg-emerald-600 px-6">Learn more</Button>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>
            </main>
            <footer id="section4" className="px-20 border-t bg-black text-white pt-10 pb-5">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div className="space-y-4 md:w-1/3  text-white">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-emerald-400">
                                    <div className="h-8 w-8 rounded-full  flex items-center justify-center">
                                        <p className="text-2xl font-bold text-black">C.</p>
                                    </div>
                                </div>
                                <span className="text-lg font-medium">Finance</span>
                            </div>
                            <p className="text-gray-400">Making personal finance management simple and effective for everyone.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-medium mb-4">Product</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="#">Features</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Pricing</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Integrations</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Updates</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium mb-4">Company</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="#">About</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Blog</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Careers</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium mb-4">Legal</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="#">Terms</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Privacy</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Security</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12  pt-8 text-center text-gray-400">
                        <p>© 2025 Covain Finance. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div >
    )
}
