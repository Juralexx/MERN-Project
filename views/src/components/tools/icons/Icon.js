import React from 'react';

import Plus from './general/Plus';
import Minus from './general/Minus';
import Link from './general/Link';
import ThreeDots from './general/ThreeDots';
import Settings from './general/Settings';
import Check from './general/Check';
import CheckCircle from './general/CheckCircle';
import Group from './general/Group';
import Search from './general/Search';
import Heart from './general/Heart';
import Bookmark from './general/Bookmark';
import Like from './general/Like';
import Trash from './general/Trash';
import MinusCircle from './general/MinusCircle';
import PlusCircle from './general/PlusCircle';
import HeartHalf from './general/HeartHalf';
import Star from './general/Star';
import StarHalf from './general/StarHalf';
import Lock from './general/Lock';
import LockCircle from './general/LockCircle'
import User from './general/User';
import UserOutline from './general/UserOutline';
import Unlock from './general/Unlock';
import Visible from './general/Visible';
import Hidden from './general/Hidden';
import Notification from './general/Notification';
import Checkbox from './general/Checkbox';
import Calendar from './general/Calendar';
import EditUnderline from './general/EditUnderline';
import Edit from './general/Edit';

import ArrowLeft from './navigation/ArrowLeft';
import ArrowRight from './navigation/ArrowRight';
import ArrowUp from './navigation/ArrowUp';
import ArrowDown from './navigation/ArrowDown';
import DoubleArrowRight from './navigation/DoubleArrowRight';
import DoubleArrowLeft from './navigation/DoubleArrowLeft';
import DoubleArrowUp from './navigation/DoubleArrowUp';
import DoubleArrowDown from './navigation/DoubleArrowDown';
import CaretUp from './navigation/CaretUp';
import CaretDown from './navigation/CaretDown';
import CaretLeft from './navigation/CaretLeft';
import CaretRight from './navigation/CaretRight';
import Register from './navigation/Register';
import Cross from './navigation/Cross';
import CrossCircle from './navigation/CrossCircle';
import External from './navigation/External';
import Expand from './navigation/Expand';
import Logout from './navigation/Logout';
import Upload from './navigation/Upload';
import UpAndDown from './navigation/UpAndDown';
import Signin from './navigation/Signin';
import Signout from './navigation/Signout';

import Chat from './communication/Chat';
import Message from './communication/Message';
import Quotes from './communication/Quotes';
import Write from './communication/Write';
import Share from './communication/Share';

import Computer from './device/Computer';

import Home from './home/Home';
import Book from './home/Book';
import BookOpen from './home/BookOpen';
import Picture from './home/Picture';
import BoxEmpty from './home/BoxEmpty';
import Box from './home/Box';
import Clock from './home/Clock';

import Map from './map/Map';
import Position from './map/Position';
import Compass from './map/Compass';
import France from './map/France';
import LocationArrow from './map/LocationArrow';
import LocationArrowHalf from './map/LocationArrowHalf';

import Camera from './device/Camera';
import Layers from './design/Layers';
import PositionSquare from './design/PositionSquare';
import ZoomMinus from './design/ZoomMinus';
import ZoomPlus from './design/ZoomPlus';

import Moon from './weather/Moon';
import Sun from './weather/Sun';
import RainCloud from './weather/RainCloud';
import Rain from './weather/Rain';
import SunFog from './weather/SunFog';
import MoonFog from './weather/MoonFog';
import Cloudy from './weather/Cloudy';
import Snowflake from './weather/Snowflake';
import Thunder from './weather/Thunder';
import Snow from './weather/Snow';
import SunCloud from './weather/SunCloud';
import Rainbow from './weather/Rainbow';
import Wind from './weather/Wind';
import Cloud from './weather/Cloud';

import UploadCloud from './files/UploadCloud';
import Download from './files/Download';
import File from './files/File';
import FilesMultiples from './files/FilesMultiples';
import Tasks from './files/Tasks';

import Article from './text/Article'
import List from './text/List';

import Dashboard from './layers/Dashboard';

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

import Music from './media/Music';
import Note from './media/Note';
import Play from './media/Play';
import PlayCircle from './media/PlayCircle';
import Repeat from './media/Repeat';
import RepeatOne from './media/RepeatOne';
import Shuffle from './media/Shuffle';
import VolumeFull from './media/VolumeFull';
import VolumeUp from './media/VolumeUp';
import Rec from './media/Rec';
import MediaLibrary from './media/MediaLibrary';
import Pause from './media/Pause';
import Back from './media/Back';
import VolumeHalf from './media/VolumeHalf';
import Mute from './media/Mute';
import Playlist from './media/Playlist';
import Forward from './media/Forward';
import Next from './media/Next';
import Backward from './media/Backward';

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
        case 'UserOutline':
            return <UserOutline {...props} />;
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
        case 'DoubleArrowUp':
            return <DoubleArrowUp {...props} />;
        case 'DoubleArrowDown':
            return <DoubleArrowDown {...props} />;
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
        case 'UploadCloud':
            return <UploadCloud {...props} />;
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
        case 'ZoomMinus':
            return <ZoomMinus {...props} />;
        case 'ZoomPlus':
            return <ZoomPlus {...props} />;
        case 'Edit':
            return <Edit {...props} />;
        case 'EditUnderline':
            return <EditUnderline {...props} />;
        case 'LocationArrow':
            return <LocationArrow {...props} />;
        case 'LocationArrowHalf':
            return <LocationArrowHalf {...props} />;
        case 'PositionSquare':
            return <PositionSquare {...props} />;
        case 'RainCloud':
            return <RainCloud {...props} />;
        case 'Rain':
            return <Rain {...props} />;
        case 'SunFog':
            return <SunFog {...props} />;
        case 'MoonFog':
            return <MoonFog {...props} />;
        case 'Cloudy':
            return <Cloudy {...props} />;
        case 'Snowflake':
            return <Snowflake {...props} />;
        case 'Thunder':
            return <Thunder {...props} />;
        case 'Snow':
            return <Snow {...props} />;
        case 'SunCloud':
            return <SunCloud {...props} />;
        case 'Rainbow':
            return <Rainbow {...props} />;
        case 'Wind':
            return <Wind {...props} />;
        case 'Cloud':
            return <Cloud {...props} />;
        case 'Music':
            return <Music {...props} />;
        case 'Note':
            return <Note {...props} />;
        case 'Play':
            return <Play {...props} />;
        case 'PlayCircle':
            return <PlayCircle {...props} />;
        case 'Repeat':
            return <Repeat {...props} />;
        case 'RepeatOne':
            return <RepeatOne {...props} />;
        case 'Shuffle':
            return <Shuffle {...props} />;
        case 'VolumeFull':
            return <VolumeFull {...props} />;
        case 'VolumeUp':
            return <VolumeUp {...props} />;
        case 'MediaLibrary':
            return <MediaLibrary {...props} />;
        case 'Pause':
            return <Pause {...props} />;
        case 'Back':
            return <Back {...props} />;
        case 'VolumeHalf':
            return <VolumeHalf {...props} />;
        case 'Mute':
            return <Mute {...props} />;
        case 'Playlist':
            return <Playlist {...props} />;
        case 'Forward':
            return <Forward {...props} />;
        case 'Next':
            return <Next {...props} />;
        case 'Backward':
            return <Backward {...props} />;
        case 'Rec':
            return <Rec {...props} />;
        case 'Signin':
            return <Signin {...props} />;
        case 'Signout':
            return <Signout {...props} />;
        default:
            return <Link {...props} />;
    }
};

export default Icon;