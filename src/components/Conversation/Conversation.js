// libs
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { MoreHoriz } from '@material-ui/icons';
import { faEllipsis, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TippyHeadless from '@tippyjs/react/headless';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// me
import styles from './Conversation.module.scss';
import Popper from '../Popper';
import userSlice, { fetchApiDeleteFriend } from '~/redux/features/user/userSlice';
import ModelInfoAccount from '../ModelWrapper/ModelInfoAccount';
import { useEffect, useState } from 'react';
import listGroupUsers, {
    blockMember,
    cancelBlockMember,
    changeLearder,
    deleteConversation,
    deleteMember,
    fetchApiConversationById,
    fetchApiDeleteConversationSingle,
    outGroup,
} from '~/redux/features/Group/GroupSlice';
import { fetchApiRecallRequestAddFriend, friendRequests } from '~/redux/features/friend/friendRequestSlice';
import { infoUserConversation } from '~/redux/features/user/userCurrent';
import {
    filterFriendGroup,
    filterLeader,
    userInfoSelector,
    userLogin,
    conversationSlice,
    listMeRequests,
    getConversationId,
    addFriendRequest,
    filterLeaderOther,
} from '~/redux/selector';

const cx = classNames.bind(styles);

function Conversation({ conversation, isPhoneBook, Group, conversationInfo }) {
    const [Friend, setFriend] = useState(false);
    const [meRequest, setMeRequest] = useState(false);
    const [idRequest, setIdRequest] = useState(false);

    const dispatch = useDispatch();

    const infoUser = useSelector(userLogin);
    const filterLeaders = useSelector(filterLeader);
    const filterLeadersOther = useSelector(filterLeaderOther);
    const listFriendFilters = useSelector(filterFriendGroup);
    const user = useSelector(userInfoSelector);
    const conversationID = useSelector(conversationSlice);
    const listMeRequest = useSelector(addFriendRequest);

    // const conversationClick = useSelector(conversationSlice);
    // console.log('conversationID', conversationID);
    // console.log('conversation', conversation);

    useEffect(() => {
        dispatch(fetchApiConversationById(user._id));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user._id]);

    // useEffect(() => {
    //     listFriendFilters?.map((key) => {
    //         if (key._id === conversation._id) {
    //             setFriend(true);
    //         }
    //     });
    // }, []);
    // useEffect(() => {
    //     listMeRequest?.map((key) => {
    //         if (key.receiverId === conversation._id) {
    //             setMeRequest(true);
    //         }
    //     });
    // }, []);

    const handleCancel = () => {
        let deletes = window.confirm('B???n c?? ch???c ch???n mu???n x??a kh??ng?');
        if (deletes === true) {
            const data = {
                idUser: infoUser._id,
                status: true,
                userDeleteId: conversation._id,
            };
            toast.success('X??a b???n th??nh c??ng.');
            dispatch(fetchApiDeleteFriend(data));
            dispatch(userSlice.actions.setUserClick(null));
        } else {
            toast.error('B???n ???? h???y y??u c???u x??a b???n!');
            return;
        }
    };

    // Sai
    // const tam = () => {
    //     conversations.map((c) => {
    //         if (c.members.includes(conversation._id)) {
    //             if (c.isGroup === false) {
    //                 return dispatch(conversationSlice.actions.clickConversation(c));
    //             }
    //         }
    //     });
    // };

    //xoa thanh vien khoi nhom
    // const handleDeleteMemberGroup = () => {
    //     let deletes = window.confirm('B???n c?? ch???c ch???n mu???n x??a th??nh vi??n n??y kh??ng?');
    //     if (deletes === true) {
    //         const data = {
    //             conversationId: conversationID.id,
    //             memberId: conversation._id,
    //             mainId: filterLeaders[0]._id,
    //         };
    //         toast.success('X??a th??nh vi??n th??nh c??ng.');
    //         dispatch(deleteMember(data));
    //     } else {
    //         toast.error('B???n ???? h???y y??u c???u!');
    //         return;
    //     }
    // };

    //roi nhom
    const handleOutGroup = () => {
        let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n r???i nh??m kh??ng?');
        if (checkOutGroup === true) {
            const dataOutGroup = {
                userId: infoUser._id,
                conversationId: conversationID.id,
            };
            toast.success('B???n ???? r???i kh???i nh??m th??nh c??ng.');
            dispatch(outGroup(dataOutGroup));
        } else {
            toast.error('B???n ???? h???y y??u c???u r???i nh??m!');
            return;
        }
    };

    //k???t b???n
    const handleAddFriend = () => {
        const data = { senderID: infoUser._id, receiverID: conversation._id };
        let tam = dispatch(friendRequests(data));
        if (tam) {
            toast.success('G???i l???i m???i k???t b???n th??nh c??ng.');
        }
    };

    const handleSeeninfoInGroup = () => {
        dispatch(
            infoUserConversation({
                userID: conversation._id,
            }),
        );
    };

    const handleDeleteGroup = () => {
        let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n gi???i t??n nh??m kh??ng?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationID.id,
                mainId: filterLeaders[0]._id,
            };
            toast.success('B???n ???? gi???i t??n nh??m.');
            dispatch(deleteConversation(data));
        } else {
            toast.error('B???n ???? h???y y??u c???u gi???i t??n nh??m!');
            return;
        }
    };

    // handle block message user
    // const handleBlockMember = () => {
    //     let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n ch???n tin nh???n kh??ng?');
    //     if (checkOutGroup === true) {
    //         const data = {
    //             conversationId: conversationID.id,
    //             userId: conversation._id,
    //         };
    //         dispatch(blockMember(data));
    //         toast.success('B???n ???? ch???n tin nh???n th??nh c??ng.');
    //     } else {
    //         toast.error('B???n ???? h???y y??u c???u ch???n tin nh???n!');
    //         return;
    //     }
    // };

    // handle un-block message user
    // const handleCancelBlockMember = () => {
    //     let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n b??? ch???n tin nh???n kh??ng?');
    //     if (checkOutGroup === true) {
    //         const data = {
    //             conversationId: conversationID.id,
    //             userId: conversation._id,
    //         };
    //         dispatch(cancelBlockMember(data));
    //         toast.success('B???n ???? b??? ch???n tin nh???n th??nh c??ng.');
    //     } else {
    //         toast.error('B???n ???? h???y y??u c???u b??? ch???n tin nh???n!');
    //         return;
    //     }
    // };

    // handle delete conversation single
    const handleDeleteConversationSingle = () => {
        const choice = window.confirm('B???n c?? ch???c ch???n mu???n x??a cu???c tr?? chuy???n n??y kh??ng?');

        if (choice === true) {
            dispatch(
                fetchApiDeleteConversationSingle({
                    conversationId: conversation.id,
                    userId: user._id,
                }),
            );
            toast.success('B???n ???? x??a th??nh c??ng cu???c tr?? chuy???n n??y.');
        } else {
            toast.error('B???n ???? ???? h???y y??u c???u x??a cu???c tr?? chuy???n!');
            return;
        }
    };

    // const handleChangeLeader = () => {
    //     let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n chuy???n quy???n tr?????ng nh??m kh??ng?');
    //     if (checkOutGroup === true) {
    //         const data = {
    //             conversationId: conversationID.id,
    //             userId: conversation._id,
    //         };
    //         dispatch(changeLearder(data));
    //         if (changeLearder()) {
    //             toast.success('B???n ???? chuy???n quy???n tr?????ng nh??m th??nh c??ng.');
    //         }
    //     } else {
    //         toast.info('B???n ???? h???y y??u c???u chuy???n quy???n tr?????ng nh??m!');
    //         return;
    //     }
    // };

    // thu hoi ket ban
    const handleCallback = () => {
        const Request = listMeRequest.filter((friend) => friend.receiverId.includes(conversation._id));
        const data = {
            status: true,
            senderID: infoUser._id,
            idRequest: Request[0].idFriendRequest,
        };
        dispatch(fetchApiRecallRequestAddFriend(data));
        toast.success('B???n ???? thu h???i l???i m???i k???t b???n.');
    };
    return (
        <>
            {conversationInfo ? (
                <div className={cx('list-conversation')} onClick={handleSeeninfoInGroup}>
                    <img
                        className={cx('avatar-img')}
                        src={conversation?.imageLinkOfConver} // conversation?.imageLinkOfConver ? : images.noImg
                        alt="avatar-user"
                    />

                    {/* <ModelInfoAccount seenInfoInGroup user={userCurrent} /> */}

                    {filterLeaders[0]?._id === conversation?._id ? (
                        <div className={cx('key-leader')}>
                            <label htmlFor="file-info" className={cx('option-avatar')}>
                                <FontAwesomeIcon className={cx('icon-camera')} icon={faKey} />
                            </label>
                        </div>
                    ) : null}
                    <div className={cx('content')}>
                        <h4 className={cx('username')}>{conversation?.name} </h4>
                    </div>

                    {!Friend && infoUser?._id !== conversation?._id ? (
                        <>
                            {meRequest ? (
                                <div className={cx('button-addFriend')} onClick={handleCallback}>
                                    <button>Thu h???i</button>
                                </div>
                            ) : (
                                <div className={cx('button-addFriend')} onClick={handleAddFriend}>
                                    <button>K???t b???n</button>
                                </div>
                            )}
                        </>
                    ) : null}

                    {filterLeaders[0]._id === conversation?._id && infoUser._id === filterLeaders[0]._id ? (
                        <TippyHeadless
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Popper className={cx('own-menu-list-children')}>
                                        <p className={cx('deleteFriend')} onClick={handleOutGroup}>
                                            <button className={cx('item-btn')}>R???i nh??m</button>
                                        </p>
                                        <p className={cx('deleteFriend')} onClick={handleDeleteGroup}>
                                            <button className={cx('item-btn')}>Gi???i t??n nh??m</button>
                                        </p>
                                    </Popper>
                                </div>
                            )}
                            interactive
                            trigger="click"
                            placement="bottom-start"
                            offset={[4, 4]}
                        >
                            <Tippy className={cx('tool-tip')} content="L???a ch???n" delay={[200, 0]}>
                                <div>
                                    <MoreHoriz className={cx('item')} />
                                </div>
                            </Tippy>
                        </TippyHeadless>
                    ) : (
                        <>
                            {infoUser._id === filterLeaders[0]._id ? (
                                <TippyHeadless
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <Popper className={cx('own-menu-list-children')}>
                                                {/* <p className={cx('deleteFriend')} onClick={handleChangeLeader}>
                                                    <button className={cx('item-btn')}>Chuy???n quy???n nh??m tr?????ng</button>
                                                </p>
                                                <p className={cx('deleteFriend')} onClick={handleDeleteMemberGroup}>
                                                    <button className={cx('item-btn')}>X??a kh???i nh??m</button>
                                                </p> */}

                                                {/* conversationID conversationClick */}
                                                {/* {conversationID.blockBy.includes(conversation?._id) ? (
                                                    <p className={cx('deleteFriend')} onClick={handleCancelBlockMember}>
                                                        <button className={cx('item-btn')}>B??? ch???n</button>
                                                    </p>
                                                ) : (
                                                    <p className={cx('deleteFriend')} onClick={handleBlockMember}>
                                                        <button className={cx('item-btn')}>Ch???n tin nh???n</button>
                                                    </p>
                                                )} */}
                                            </Popper>
                                        </div>
                                    )}
                                    interactive
                                    trigger="click"
                                    placement="bottom-start"
                                    offset={[4, 4]}
                                >
                                    <Tippy className={cx('tool-tip')} content="L???a ch???n" delay={[200, 0]}>
                                        <div>
                                            <MoreHoriz className={cx('item')} />
                                        </div>
                                    </Tippy>
                                </TippyHeadless>
                            ) : (
                                <>
                                    {infoUser._id === conversation?._id ? (
                                        <TippyHeadless
                                            render={(attrs) => (
                                                <div tabIndex="-1" {...attrs}>
                                                    <Popper className={cx('own-menu-list-children')}>
                                                        <p className={cx('deleteFriend')} onClick={handleOutGroup}>
                                                            <button className={cx('item-btn')}>R???i nh??m</button>
                                                        </p>
                                                    </Popper>
                                                </div>
                                            )}
                                            interactive
                                            trigger="click"
                                            placement="bottom-start"
                                            offset={[4, 4]}
                                        >
                                            <Tippy className={cx('tool-tip')} content="L???a ch???n" delay={[200, 0]}>
                                                <div>
                                                    <MoreHoriz className={cx('item')} />
                                                </div>
                                            </Tippy>
                                        </TippyHeadless>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className={cx('container-conversation')}>
                    <div className={cx('list-conversation')}>
                        {/*onClick={tam}  */}
                        <img className={cx('avatar-img')} src={conversation?.imageLinkOfConver} alt="avatar" />

                        <div className={cx('content')}>
                            <h4 className={cx('username')}>{conversation?.name} </h4>
                            {isPhoneBook ? null : (
                                <p className={cx('message')}>{conversation?.content || conversation?.lastMessage}</p>
                            )}
                        </div>

                        {isPhoneBook && !Group ? (
                            <TippyHeadless
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <Popper className={cx('own-menu-list-children')}>
                                            <p className={cx('deleteFriend')}>
                                                <ModelInfoAccount yourProfile friend user={conversation} />
                                            </p>
                                            <p className={cx('deleteFriend')} onClick={handleCancel}>
                                                <button className={cx('item-btn')}> X??a B???n</button>
                                            </p>
                                        </Popper>
                                    </div>
                                )}
                                interactive
                                trigger="click"
                                placement="bottom-start"
                                offset={[4, 4]}
                            >
                                <Tippy className={cx('tool-tip')} content="L???a ch???n" delay={[200, 0]}>
                                    <div>
                                        <MoreHoriz className={cx('item')} />
                                    </div>
                                </Tippy>
                            </TippyHeadless>
                        ) : null}

                        {isPhoneBook ? null : (
                            <div className={cx('notification')}>
                                <span className={cx('time')}>{format(conversation?.time)}</span>
                                {/* {conversationID?.id === conversation?.id ? (
                                    <>
                                        {notifications.length > 0 && (
                                            <span className={cx('badge')}>{notifications.length}</span>
                                        )}
                                    </>
                                ) : null} */}
                            </div>
                        )}
                    </div>

                    {isPhoneBook ? null : (
                        <button className={cx('option-remove-conversation')}>
                            <TippyHeadless
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs} className={cx('tippy-remove-conversation')}>
                                        <Popper className={cx('popper-remove-conversation')}>
                                            <button
                                                className={cx('btn-remove')}
                                                onClick={handleDeleteConversationSingle}
                                            >
                                                X??a cu???c tr?? chuy???n
                                            </button>
                                        </Popper>
                                    </div>
                                )}
                                delay={[0, 100]}
                                placement="bottom-end"
                                // offset={[0, 0]}
                                interactive
                            >
                                <FontAwesomeIcon className={cx('option-del')} icon={faEllipsis} />
                            </TippyHeadless>
                        </button>
                    )}
                </div>
            )}

            {/* Show toast status */}
            <ToastContainer position="top-right" autoClose={4000} closeOnClick={false} />
        </>
    );
}

export default Conversation;
