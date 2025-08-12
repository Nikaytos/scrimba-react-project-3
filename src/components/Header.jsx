import logo from '../assets/chef-claude-icon.png';

export default function Header() {
    return (
        <header className={'header'}>
            <img className={'logo'} src={logo} alt="chef claude icon" />
            <h1 className={'title'}>Chef Claude</h1>
        </header>
    )
}