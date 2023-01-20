import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fullImage } from "../../Utils";
import { Button, TextButton } from "../global/Button";

const HoverModal = ({ user, style, open }) => {
    return (
        open && (
            <UserModal className="hovered_card" style={style}>
                <div className="hovered-modal_container">
                    <div className="hovered-modal_head">
                        <div className="left">
                            <Link to={`user/${user.pseudo}`}>
                                <div className="hovered-modal_avatar" style={fullImage(user.picture)}></div>
                            </Link>
                        </div>
                        <div className="right">
                            <div className="hovered_card-name">
                                <Link to={`user/${user.pseudo}`}>{user.pseudo}</Link>
                                {user?.work &&
                                    <p>{user.work}</p>
                                }
                            </div>
                            <p>{user?.created_projects?.length} projets créés</p>
                            <p>A participé à {user?.projects?.length} projets</p>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <TextButton className="mr-2">
                            <Link to={`user/${user.pseudo}/projects`}>Voir les projets</Link>
                        </TextButton>
                        <Button>
                            <Link to={`user/${user.pseudo}`} className="mr-1">Voir le profil</Link>
                        </Button>
                    </div>
                </div>
            </UserModal>
        )
    )
}

export default HoverModal;

const UserModal = styled.div`
    position : absolute;
    bottom   : 10px;
    left     : -120px;
    padding  : 32px;

    .hovered-modal_container {
        padding          : 12px;
        width            : auto;
        min-width        : 320px;
        background-color : var(--content-light);
        border           : 2px solid var(--content-x-light);
        border-radius    : var(--rounded-md);
        box-shadow       : var(--shadow-xl);

        p {
            font-size   : 12px;
            font-weight : 300;
        }

        button {
            width : 100%;
        }

        .hovered-modal_head {
            display       : flex;
            width         : 100%;
            margin-bottom : 12px;

            .hovered-modal_avatar {
                width         : 76px;
                height        : 76px;
                border-radius : var(--rounded-full);
            }

            .left {
                padding-right : 20px;
            }

            .hovered_card-name {
                font-weight   : 500;
                font-size     : 18px;
                margin-bottom : 6px;
                line-height   : 20px;
            }
        }
    }
`