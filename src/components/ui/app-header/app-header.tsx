import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <Link className={styles.article} to={'/'}>
            <div className={styles.link_position_last}>
              <BurgerIcon type={'primary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </div>
          </Link>
        </>
        <>
          <Link className={styles.article} to={'/feed'}>
            <div className={styles.link_position_last}>
              <ListIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </div>
          </Link>
        </>
      </div>
      <div className={styles.logo}>
        <Link className={styles.article} to={'/'}>
          <div className={styles.link_position_last}>
            <Logo className='' />
          </div>
        </Link>
      </div>
      <Link className={styles.article} to='/login'>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </Link>
    </nav>
  </header>
);
