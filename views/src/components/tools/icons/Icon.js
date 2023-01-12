import React from 'react';
import Plus from './Plus';
import Minus from './Minus';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import ArrowDown from './ArrowDown';
import DoubleArrowRight from './DoubleArrowRight';
import DoubleArrowLeft from './DoubleArrowLeft';
import Chat from './Chat';
import Checkbox from './Checkbox';
import Computer from './Computer';
import Dashboard from './Dashboard';
import Home from './Home';
import Link from './Link';
import Message from './Message';
import Notification from './Notification';
import Register from './Register';
import User from './User';
import Logout from './Logout';
import Settings from './Settings';
import Moon from './Moon';
import Sun from './Sun';
import CaretUp from './CaretUp';
import CaretDown from './CaretDown';
import CaretLeft from './CaretLeft';
import CaretRight from './CaretRight';
import ThreeDots from './ThreeDots';
import Cross from './Cross';
import CrossCircle from './CrossCircle';
import Check from './Check';
import CheckCircle from './CheckCircle';
import Group from './Group';
import External from './External';
import Write from './Write';
import Expand from './Expand';
import Search from './Search';
import Map from './Map';
import Position from './Position';
import Compass from './Compass';
import Heart from './Heart';
import HeartHalf from './HeartHalf';
import Star from './Star';
import StarHalf from './StarHalf';
import Lock from './Lock';
import LockCircle from './LockCircle';
import Unlock from './Unlock';
import Bookmark from './Bookmark';
import Quotes from './Quotes';
import List from './List';
import Like from './Like';
import Trash from './Trash';
import BoxEmpty from './BoxEmpty';
import Box from './Box';
import Clock from './Clock';
import Calendar from './Calendar';
import Visible from './Visible';
import Hidden from './Hidden';
import Camera from './Camera';
import France from './France';
import Book from './Book';
import BookOpen from './BookOpen';
import Picture from './Picture';
import Layers from './Layers';
import Share from './Share';
import Upload from './Upload';
import Download from './Download';
import PlusCircle from './PlusCircle';
import MinusCircle from './MinusCircle';
import UpAndDown from './UpAndDown';
import Tasks from './Tasks';
import File from './File';
import FilesMultiples from './FilesMultiples';
import Facebook from './networks/Facebook';
import FacebookCircle from './networks/FacebookCircle';
import FacebookSquare from './networks/FacebookSquare';
import FacebookOutline from './networks/FacebookOutline';
import Snapchat from './networks/Snapchat';
import SnapchatSquare from './networks/SnapchatSquare';
import SnapchatCircle from './networks/SnapchatCircle';
import SnapchatOutline from './networks/SnapchatOutline';
import Pinterest from './networks/Pinterest';
import PinterestCircle from './networks/PinterestCircle';
import PinterestSquare from './networks/PinterestSquare';
import PinterestOutline from './networks/PinterestOutline';
import Instagram from './networks/Instagram';
import InstagramFill from './networks/InstagramFill';
import InstagramSquare from './networks/InstagramSquare';
import Youtube from './networks/Youtube';
import YoutubeOutline from './networks/YoutubeOutline';
import YoutubeSquare from './networks/YoutubeSquare';
import YoutubeTextLogo from './networks/YoutubeTextLogo';
import Twitter from './networks/Twitter';
import TwitterSquare from './networks/TwitterSquare';
import TwitterCircle from './networks/TwitterCircle';
import TwitterOutline from './networks/TwitterOutline';
import Twitch from './networks/Twitch';
import TwitchOutline from './networks/TwitchOutline';
import Linkedin from './networks/Linkedin';
import LinkedinOutline from './networks/LinkedinOutline';
import LinkedinSquare from './networks/LinkedinSquare';
import LinkedinSquareOutline from './networks/LinkedinSquareOutline';
import Whatsapp from './networks/Whatsapp';
import WhatsappSquare from './networks/WhatsappSquare';
import WhatsappOutline from './networks/WhatsappOutline';
import Article from './Article'

const Icon = (props) => {
    switch (props.name) {
        case 'Home':
            return <Home {...props} />;
        case 'Computer':
            return <Computer {...props} />;
        case 'Dashboard':
            return <Dashboard {...props} />;
        case 'Plus':
            return <Plus {...props} />;
        case 'PlusCircle':
            return <PlusCircle {...props} />;
        case 'Minus':
            return <Minus {...props} />;
        case 'MinusCircle':
            return <MinusCircle {...props} />;
        case 'Chat':
            return <Chat {...props} />;
        case 'Message':
            return <Message {...props} />;
        case 'User':
            return <User {...props} />;
        case 'Checkbox':
            return <Checkbox {...props} />;
        case 'Register':
            return <Register {...props} />;
        case 'Notification':
            return <Notification {...props} />;
        case 'ArrowLeft':
            return <ArrowLeft {...props} />;
        case 'ArrowRight':
            return <ArrowRight {...props} />;
        case 'ArrowUp':
            return <ArrowUp {...props} />;
        case 'ArrowDown':
            return <ArrowDown {...props} />;
        case 'UpAndDown':
            return <UpAndDown {...props} />;
        case 'CaretLeft':
            return <CaretLeft {...props} />;
        case 'CaretRight':
            return <CaretRight {...props} />;
        case 'CaretDown':
            return <CaretDown {...props} />;
        case 'CaretUp':
            return <CaretUp {...props} />;
        case 'DoubleArrowLeft':
            return <DoubleArrowLeft {...props} />;
        case 'DoubleArrowRight':
            return <DoubleArrowRight {...props} />;
        case 'Logout':
            return <Logout {...props} />;
        case 'Settings':
            return <Settings {...props} />;
        case 'Moon':
            return <Moon {...props} />;
        case 'Sun':
            return <Sun {...props} />;
        case 'ThreeDots':
            return <ThreeDots {...props} />;
        case 'Cross':
            return <Cross {...props} />;
        case 'CrossCircle':
            return <CrossCircle {...props} />;
        case 'Check':
            return <Check {...props} />;
        case 'CheckCircle':
            return <CheckCircle {...props} />;
        case 'Group':
            return <Group {...props} />;
        case 'External':
            return <External {...props} />;
        case 'Write':
            return <Write {...props} />;
        case 'Expand':
            return <Expand {...props} />;
        case 'Search':
            return <Search {...props} />;
        case 'Map':
            return <Map {...props} />;
        case 'Position':
            return <Position {...props} />;
        case 'Compass':
            return <Compass {...props} />;
        case 'Heart':
            return <Heart {...props} />;
        case 'HeartHalf':
            return <HeartHalf {...props} />;
        case 'Star':
            return <Star {...props} />;
        case 'StarHalf':
            return <StarHalf {...props} />;
        case 'Lock':
            return <Lock {...props} />;
        case 'LockCircle':
            return <LockCircle {...props} />;
        case 'Unlock':
            return <Unlock {...props} />;
        case 'Bookmark':
            return <Bookmark {...props} />;
        case 'Quotes':
            return <Quotes {...props} />;
        case 'List':
            return <List {...props} />;
        case 'Like':
            return <Like {...props} />;
        case 'Trash':
            return <Trash {...props} />;
        case 'BoxEmpty':
            return <BoxEmpty {...props} />;
        case 'Box':
            return <Box {...props} />;
        case 'Clock':
            return <Clock {...props} />;
        case 'Calendar':
            return <Calendar {...props} />;
        case 'Book':
            return <Book {...props} />;
        case 'BookOpen':
            return <BookOpen {...props} />;
        case 'Visible':
            return <Visible {...props} />;
        case 'Hidden':
            return <Hidden {...props} />;
        case 'Camera':
            return <Camera {...props} />;
        case 'France':
            return <France {...props} />;
        case 'Picture':
            return <Picture {...props} />;
        case 'Layers':
            return <Layers {...props} />;
        case 'Facebook':
            return <Facebook {...props} />;
        case 'FacebookSquare':
            return <FacebookSquare {...props} />;
        case 'FacebookCircle':
            return <FacebookCircle {...props} />;
        case 'FacebookOutline':
            return <FacebookOutline {...props} />;
        case 'Instagram':
            return <Instagram {...props} />;
        case 'InstagramFill':
            return <InstagramFill {...props} />;
        case 'InstagramSquare':
            return <InstagramSquare {...props} />;
        case 'Snapchat':
            return <Snapchat {...props} />;
        case 'SnapchatSquare':
            return <SnapchatSquare {...props} />;
        case 'SnapchatCircle':
            return <SnapchatCircle {...props} />;
        case 'SnapchatOutline':
            return <SnapchatOutline {...props} />;
        case 'Pinterest':
            return <Pinterest {...props} />;
        case 'PinterestCircle':
            return <PinterestCircle {...props} />;
        case 'Pinterest':
            return <PinterestSquare {...props} />;
        case 'Pinterest':
            return <PinterestOutline {...props} />;
        case 'Youtube':
            return <Youtube {...props} />;
        case 'YoutubeOutline':
            return <YoutubeOutline {...props} />;
        case 'YoutubeSquare':
            return <YoutubeSquare {...props} />;
        case 'YoutubeTextLogo':
            return <YoutubeTextLogo {...props} />;
        case 'Twitter':
            return <Twitter {...props} />;
        case 'TwitterSquare':
            return <TwitterSquare {...props} />;
        case 'TwitterOutline':
            return <TwitterOutline {...props} />;
        case 'TwitterCircle':
            return <TwitterCircle {...props} />;
        case 'Twitch':
            return <Twitch {...props} />;
        case 'TwitchOutline':
            return <TwitchOutline {...props} />;
        case 'Linkedin':
            return <Linkedin {...props} />;
        case 'LinkedinOutline':
            return <LinkedinOutline {...props} />;
        case 'LinkedinSquare':
            return <LinkedinSquare {...props} />;
        case 'LinkedinSquareOutline':
            return <LinkedinSquareOutline {...props} />;
        case 'Whatsapp':
            return <Whatsapp {...props} />;
        case 'WhatsappSquare':
            return <WhatsappSquare {...props} />;
        case 'WhatsappOutline':
            return <WhatsappOutline {...props} />;
        case 'Share':
            return <Share {...props} />;
        case 'Upload':
            return <Upload {...props} />;
        case 'Download':
            return <Download {...props} />;
        case 'Tasks':
            return <Tasks {...props} />;
        case 'File':
            return <File {...props} />;
        case 'FilesMultiples':
            return <FilesMultiples {...props} />;
        case 'Article':
            return <Article {...props} />;
        default:
            return <Link {...props} />;
    }
};

export default Icon;