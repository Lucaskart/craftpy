import { IconButton } from '@radix-ui/themes';
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Outlet, Link } from "react-router-dom";
import '../styles/styles.css';


const navigation = [
    { name: 'Início', id: 'home', href: '/py2uml/', accessKey: '4', current: true },
    { name: 'Exemplos', id: 'example', href: '/py2uml/examples', accessKey: '5', current: false },
    { name: 'Ajuda', id: 'help', href: '/py2uml/help', accessKey: '6', current: false },
]


function NavigationBar() {

    return (
        <div className="min-h-full">
            <header className="bg-[var(--blue-a2)] shadow">
                <div className="flex flex-row justify-between items-center mx-auto max-w-full px-4 py-2">
                    <img
                        src="logo.png"
                        alt="Py2UML Logo"
                        style={{
                            objectFit: 'cover',
                            width: '80px',
                            height: '42px',
                            borderRadius: 'var(--radius-2)',
                        }}
                    />
                    <div className='flex flex-row gap-6 lg:gap-12'>
                        {navigation.map((item) => (
                            <Link key={item.id} id={item.id} accessKey={item.accessKey} to={item.href} className="MenuLink hover:font-bold text-sm lg:text-lg">{item.name}</Link>
                        ))}
                    </div>
                    <Link to="https://github.com/Lucaskart/Py2UML" className="MenuLink hidden lg:flex">
                        <IconButton variant="ghost">
                            <GitHubLogoIcon width="25" height="25" />
                        </IconButton>
                    </Link>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-full">{
                    <Outlet />
                }</div>
            </main>
        </div>



    );
}

export default NavigationBar
