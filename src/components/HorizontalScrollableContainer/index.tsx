import {
  FC,
  ReactNode,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'

import { LeftCaretIcon } from 'icons/Caret/Left'
import { RightCaretIcon } from 'icons/Caret/Right'
import {
  ArrowButton,
  ArrowButtonContainer,
  IntersectionObserverSpan,
  MainContainer,
  ScrollableContainer,
} from 'components/HorizontalScrollableContainer/styles'

export type booleanCallback = () => boolean
export type asyncBooleanCallback = () => Promise<boolean>

export interface HorizontalScrollableContainerProps {
  children: ReactNode
  showScrollbar?: boolean
  wrap?: boolean
  loadingThreshold?: number | number[]
  onIntersectionRight?: booleanCallback | asyncBooleanCallback
  onIntersectionLeft?: booleanCallback | asyncBooleanCallback
  onBackClick?: () => unknown
  onForwardClick?: () => unknown
  leftThreshold?: number
  rightThreshold?: number
  fadeOutRadius?: number
  BackButton?: FC
  ForwardButton?: FC
}

export const HorizontalScrollableContainer: FC<
  HorizontalScrollableContainerProps
> = ({
  BackButton,
  ForwardButton,
  children,
  onIntersectionRight,
  onIntersectionLeft,
  onBackClick,
  onForwardClick,
  showScrollbar = true,
  wrap = false,
  loadingThreshold = 0.8,
  leftThreshold = 0.7,
  rightThreshold = 0.5,
}) => {
  const [scrollLength, setScrollLength] = useState<number>(0)
  const [isIntersectingRight, setIsIntersectingRight] = useState<boolean>(false)
  const [isIntersectingLeft, setIsIntersectingLeft] = useState<boolean>(true)
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true)
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false)
  const [hasPassedThresholdRight, setHasPassedThresholdRight] =
    useState<boolean>(false)
  const [hasPassedThresholdLeft, setHasPassedThresholdLeft] =
    useState<boolean>(false)
  const scrollableRef = useRef<HTMLDivElement>(null)
  const intersectionRefRight = useRef<HTMLSpanElement>(null)
  const intersectionRefLeft = useRef<HTMLSpanElement>(null)
  const callbackRight: IntersectionObserverCallback = async (entries) => {
    const [entry] = entries
    if (entry.isIntersecting && onIntersectionRight) {
      const result = await onIntersectionRight()
      setIsIntersectingRight(!!result)
    } else {
      setIsIntersectingRight(entry.isIntersecting)
    }
  }
  const callbackLeft: IntersectionObserverCallback = async (entries) => {
    const [entry] = entries
    if (entry.isIntersecting && onIntersectionLeft) {
      const result = await onIntersectionLeft()
      setIsIntersectingLeft(!!result)
    } else {
      setIsIntersectingLeft(entry.isIntersecting)
    }
  }
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: loadingThreshold,
  }
  useEffect(() => {
    const observerRight = new IntersectionObserver(callbackRight, options)
    let elementRight: HTMLSpanElement | null = null
    if (intersectionRefRight.current) {
      elementRight = intersectionRefRight.current
      observerRight.observe(elementRight)
    }
    return () => {
      if (elementRight !== null) {
        observerRight.unobserve(elementRight)
      }
    }
  }, [options, intersectionRefRight])

  useEffect(() => {
    const observerLeft = new IntersectionObserver(callbackLeft, {
      ...options,
      threshold: 0.25,
    })
    let elementLeft: HTMLSpanElement | null = null
    if (intersectionRefLeft.current) {
      elementLeft = intersectionRefLeft.current
      observerLeft.observe(elementLeft)
    }
    return () => {
      if (elementLeft !== null) {
        observerLeft.unobserve(elementLeft)
      }
    }
  }, [options, intersectionRefLeft])

  useEffect(() => {
    setScrollLength(scrollableRef.current?.scrollLeft ?? 0)
  }, [])

  const handleRightThreshold = async () => {
    setTimeout(async () => {
      if (onIntersectionRight) {
        await onIntersectionRight()
      }
      setHasPassedThresholdRight(false)
    }, 250)
  }

  const handleLeftThreshold = async () => {
    await setTimeout(async () => {
      if (onIntersectionLeft) {
        await onIntersectionLeft()
      }
      setHasPassedThresholdLeft(false)
    }, 250)
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollableRef.current !== null) {
      const { width } = scrollableRef.current.getBoundingClientRect()
      if (direction === 'right') {
        const rightScroll = scrollableRef.current.scrollLeft + width * 0.9
        if (onForwardClick !== undefined) {
          onForwardClick()
        }
        scrollableRef.current.scroll({
          top: 0,
          left: rightScroll,
          behavior: 'smooth',
        })
        const { scrollWidth } = scrollableRef.current
        setScrollLength(scrollableRef.current.scrollLeft)
        setIsIntersectingLeft(false)
        setCanScrollRight(rightScroll <= scrollWidth * 0.9)
        setHasPassedThresholdRight(rightScroll >= scrollWidth * rightThreshold)
        setCanScrollLeft(true)
      } else {
        const leftScroll = scrollableRef.current.scrollLeft - width * 0.9
        if (onBackClick !== undefined) {
          onBackClick()
        }
        scrollableRef.current.scroll({
          top: 0,
          left: leftScroll,
          behavior: 'smooth',
        })
        if (scrollLength !== 0) {
          setScrollLength(scrollableRef.current.scrollLeft)
        }
        setCanScrollLeft(leftScroll >= 0)
        setCanScrollRight(true)
        setIsIntersectingRight(false)
        setHasPassedThresholdLeft(
          canScrollLeft &&
            leftScroll <= scrollableRef.current.scrollWidth * leftThreshold
        )
      }
    }
  }

  useEffect(() => {
    if (hasPassedThresholdLeft) {
      handleLeftThreshold()
    }
  }, [hasPassedThresholdLeft])
  useEffect(() => {
    if (hasPassedThresholdRight) {
      handleRightThreshold()
    }
  }, [hasPassedThresholdRight])

  const scrollListener: UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget
    if (isIntersectingLeft) {
      if (scrollLength > target.scrollLeft || scrollLength === 0) {
        setIsIntersectingLeft(false)
        setCanScrollLeft(true)
      }
    }
    if (isIntersectingRight && scrollLength < target.scrollLeft) {
      setIsIntersectingRight(false)
      setCanScrollRight(true)
    }

    if (scrollableRef.current != null) {
      const { scrollLeft, scrollWidth } = scrollableRef.current
      setHasPassedThresholdRight(
        canScrollRight && scrollLeft >= scrollWidth * rightThreshold
      )
      setHasPassedThresholdLeft(
        canScrollLeft && scrollLeft <= scrollWidth * leftThreshold
      )
    }
  }

  let backButton: ReactNode
  let forwardButton: ReactNode
  if (BackButton) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    backButton = <BackButton onClick={() => handleScroll('left')} />
  } else {
    backButton = (
      <ArrowButton onClick={() => handleScroll('left')}>
        <LeftCaretIcon size="S" />
      </ArrowButton>
    )
  }

  if (ForwardButton) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    forwardButton = <ForwardButton onClick={() => handleScroll('right')} />
  } else {
    forwardButton = (
      <ArrowButton onClick={() => handleScroll('right')}>
        <RightCaretIcon size="S" />
      </ArrowButton>
    )
  }

  return (
    <MainContainer>
      {!isIntersectingLeft && (
        <ArrowButtonContainer direction="left">
          {!isIntersectingLeft && canScrollLeft && backButton}
        </ArrowButtonContainer>
      )}
      <ScrollableContainer
        showScrollbar={showScrollbar}
        wrap={wrap.toString()}
        ref={scrollableRef}
        onScroll={(e) => scrollListener(e)}
      >
        <IntersectionObserverSpan
          show={!isIntersectingLeft}
          ref={intersectionRefLeft}
        >
          -
        </IntersectionObserverSpan>
        {children}
        <IntersectionObserverSpan
          show={!isIntersectingRight}
          ref={intersectionRefRight}
        >
          -
        </IntersectionObserverSpan>
      </ScrollableContainer>
      {!isIntersectingRight && (
        <ArrowButtonContainer direction="right">
          {!isIntersectingRight && canScrollRight && forwardButton}
        </ArrowButtonContainer>
      )}
    </MainContainer>
  )
}
