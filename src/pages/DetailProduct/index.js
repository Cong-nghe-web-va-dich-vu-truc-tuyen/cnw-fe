import classNames from 'classnames/bind'
import styles from './DetailProduct.module.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { formatter } from '../../utils/tool'
import { addProductToCart, updateCart } from '../../features/cart/cartSlice'
import Navbar from '../../components/Navbar'
const cx = classNames.bind(styles)

function DetailProduct() {
    const dispatch = useDispatch()
    const [qnt, setQnt] = useState(1)
    const param = useParams()
    const products = useSelector((state) => state.products.products)
    const detailProduct = products.filter((product) => product._id === param.id)[0]
    const cart = useSelector((state) => state.cart.products || [])
    const handleAddCart = (product, qnt) => {
        const productNew = { ...product, amount: qnt }
        if (
            cart.some((item) => {
                return product._id === item._id
            })
        ) {
            dispatch(updateCart(productNew))
        } else {
            dispatch(addProductToCart(productNew))
        }
    }
    return (
        <div className={cx('wrapper')}>
            <Navbar name={detailProduct.name} />
            <div className="grid wide">
                <div className={cx('contentPro', 'row')}>
                    <div className={cx('imgPro', 'col', 'c-6')}>
                        <div className={cx('mainImg')}>
                            <img
                                src={detailProduct.linkImg[0]}
                                alt="anh"
                            />
                        </div>
                        <div className={cx('otherImg', 'row')}>
                            <div className={cx('img1', 'col', 'c-3')}>
                                <img
                                    src={detailProduct.linkImg[1]}
                                    alt="anh"
                                />
                            </div>
                            <div className={cx('img2', 'col', 'c-3')}>
                                <img
                                    src={detailProduct.linkImg[0]}
                                    alt="anh"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('imgDetail', 'col', 'c-6')}>
                        <div className={cx('namePro')}>{detailProduct.name}</div>
                        <div className={cx('codePro')}>SKU: 1110</div>
                        <div className={cx('pricePro')}>{formatter.format(detailProduct.price)}</div>
                        <div className={cx('sizePro')}>
                            <div className={cx('sizeTitle')}>Size:</div>
                            {detailProduct.size.map((item) => {
                                return (
                                    <div
                                        className={cx('sizeDetail')}
                                        key={item.size}
                                    >
                                        {item.size}
                                    </div>
                                )
                            })}
                            {/* <div className={cx('sizeDetail', 'activeSize')}>38</div> */}
                        </div>
                        <div className={cx('actionPro')}>
                            <div className={cx('qntPro')}>
                                <div className={cx('qntTitle')}>Quantity: </div>
                                <div className={cx('qntAction')}>
                                    <div
                                        className={cx('qntDecre')}
                                        onClick={() => {
                                            if (qnt > 1) {
                                                setQnt(qnt - 1)
                                            }
                                        }}
                                    >
                                        -
                                    </div>
                                    <div className={cx('qnt')}>{qnt}</div>
                                    <div
                                        className={cx('qntIncre')}
                                        onClick={() => setQnt(qnt + 1)}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                            <div
                                className={cx('addToCart')}
                                onClick={() => {
                                    handleAddCart(detailProduct, qnt)
                                }}
                            >
                                Add to Cart
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
