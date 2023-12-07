/* eslint-disable @next/next/no-img-element */
"use client";
export default function ButtonLoadMore(props) {
  const { onClick } = props

  return (
    <button type="button" className="button" onClick={onClick}>
      <img src="./buttons/chevron_down.svg" alt="" />
    </button>
  )
}
