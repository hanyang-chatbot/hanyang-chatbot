from engine.services.shuttle import *


def test_shuttle_bus_get():
    sb = ShuttleBus()
    res = sb.get(season=Season.학기중, weekend=WeekEnd.휴일, hours=20, minutes=46, seconds=0)
    assert res["station_cycle"] == {"minutes": 14, "seconds": 0, "status": True}
    sb = ShuttleBus("test")

    res = sb.get(season=Season.학기중, weekend=WeekEnd.월금, hours=2, minutes=54, seconds=59)

    # 기숙사 ~ 셔틀콕은 5분, 2시 55분 출발하므로 1초 남아야 정상
    assert res["dorm_cycle"] == {"minutes": 0, "seconds": 1, "status": True}
    # 3시에 셔틀콕에 도착하므로, 2시 54분 59초에 5분 1초 남아야 정상
    assert res["shuttle_cycle"] == {"minutes": 5, "seconds": 1, "status": True}
    # 셔틀콕 ~ 한대앞역은 10분
    assert res["station_cycle"] == {"minutes": 15, "seconds": 1, "status": True}
    # 셔틀콕 ~ 예술인아파트는 15분
    assert res["artin_cycle"] == {"minutes": 20, "seconds": 1, "status": True}
    # 셔틀콕 ~ 셔틀콕은 25분
    assert res["shuttle_cycle2"] == {"minutes": 30, "seconds": 1, "status": True}

    assert sb.get_current() is not None


def test_shuttle_bus_get_table():
    sb = ShuttleBus("test")
    table = sb.get_table("학기중", "순환노선", "월금")
    assert table[0] == [3, 0, 23, 0, None]


def test_shuttle_bus_set_table():
    sb = ShuttleBus("test")
    data = [[8, 50, 21, 50, 30]]
    ret = sb.set_recipe([[8, 50, 21, 50, 30]], "방학", "순환노선", "휴일")
    assert ret == data
    data = [[8, 50, 21, 50, None]]
    ret = sb.set_recipe([[8, 50, 21, 50, None]], "방학", "순환노선", "휴일")
    assert ret == data


def test_shuttle_convert():
    x = [7, 50, 8, 50, None]
    start, end, term = to_str(x)
    assert (start, end, term) == ("07:50", "08:50", None)
    assert from_str(start) == (7, 50)

    x = [0, 30, 19, 50, 5]
    start, end, term = to_str(x)
    assert (start, end, term) == ("00:30", "19:50", 5)
    assert from_str("0:30") == (0, 30)
