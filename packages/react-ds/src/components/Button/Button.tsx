import React from 'react'

import { IButton, IDynamicComponentProps } from '@venice/core/models'
import styles from '@venice/styles/components/Button.module.scss'

import Spinner from '../Spinner/Spinner'

interface IButtonProps extends IButton {
  /** string */
  className?: string
  /** React Element */
  children?: React.ReactNode
  /** React Element | string */
  endIcon?: React.ReactNode | string
  /** React Element | string */
  startIcon?: React.ReactNode | string
}

const ButtonComponent: React.FunctionComponent<IDynamicComponentProps &
  React.HTMLAttributes<HTMLOrSVGElement>> = ({
  as: Wrapper = 'button',
  children,
  ...rest
}) => {
  return <Wrapper {...rest}>{children}</Wrapper>
}

const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  className = '',
  color = 'default',
  endIcon,
  href,
  size = 'medium',
  startIcon,
  isLoading = false,
  variant = 'filled',
  ...rest
}: IButtonProps) => {
  return (
    <>
      <ButtonComponent
        as={href ? 'a' : 'button'}
        role={href ? '' : 'button'}
        aria-busy={isLoading}
        className={`
          ${styles.btn}
          ${styles[color]}
          ${styles[variant]}
          ${styles[size]}
          ${isLoading ? styles.isLoading : ''}
          ${className}
        `}
        {...rest}
      >
        {isLoading && (
          <Spinner
            color={variant === 'filled' ? `${color}-contrast` : color}
            size={size === 'small' ? 16 : 24}
            className={`${styles.loading}`}
          />
        )}
        <>
          {startIcon && (
            <span className={`${styles.startIcon}`}>{startIcon}</span>
          )}
          <span className={`${styles.children}`}>{children}</span>
          {endIcon && <span className={`${styles.endIcon}`}>{endIcon}</span>}
        </>
      </ButtonComponent>
    </>
  )
}

export default Button
