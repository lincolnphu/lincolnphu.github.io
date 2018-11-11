firewall {
    all-ping enable
    broadcast-ping disable
    config-trap disable
    ipv6-receive-redirects disable
    ipv6-src-route disable
    ip-src-route disable
    log-martians enable
    name LOCAL_RULES {
        default-action accept
        rule 10 {
            action reject
            destination {
                port ssh
            }
            protocol tcp
        }
    }
    name OUTSIDE_IN {
        default-action drop
        rule 10 {
            action accept
            state {
                established enable
                related enable
            }
        }
        rule 20 {
            action accept
            destination {
                port 8388
            }
            protocol tcp
        }
    }
    name OUTSIDE_LOCAL {
        default-action drop
        rule 10 {
            action accept
            state {
                established enable
                related enable
            }
        }
    }
    receive-redirects disable
    send-redirects enable
    source-validation disable
    syn-cookies enable
    twa-hazards-protection disable
}
interfaces {
    ethernet eth0 {
        description OUTSIDE
        duplex auto
        firewall {
            in {
                name OUTSIDE_IN
            }
            local {
                name OUTSIDE_LOCAL
            }
        }
        hw-id 0c:e8:5c:68:3a:5e
        policy {
            route pppoe-out
        }
        pppoe 0 {
            default-route auto
            firewall {
                local {
                    name LOCAL_RULES
                }
            }
            mtu 1500
            name-server auto
            password 12345678
            user-id 076923078611
        }
        smp-affinity auto
        speed auto
        traffic-policy {
        }
    }
    ethernet eth1 {
        address 192.168.1.1/24
        description INSIDE
        duplex auto
        hw-id 0c:e8:5c:68:3a:5f
        policy {
            route pppoe-out
        }
        smp-affinity auto
        speed auto
        traffic-policy {
        }
    }
    ethernet eth2 {
        address 192.168.0.1/24
        duplex auto
        smp-affinity auto
        speed auto
    }
    ethernet eth3 {
        duplex auto
        smp-affinity auto
        speed auto
    }
}
nat {
    destination {
        rule 1 {
            destination {
                port 8388
            }
            inbound-interface pppoe0
            protocol tcp
            translation {
                address 192.168.0.34
                port 8388
            }
        }
    }
    source {
        rule 10 {
            outbound-interface pppoe0
            source {
                address 192.168.0.0/24
            }
            translation {
                address masquerade
            }
        }
        rule 100 {
            outbound-interface pppoe0
            source {
                address 0.0.0.0/0
            }
            translation {
                address masquerade
            }
        }
    }
}
service {
    dhcp-server {
        shared-network-name LAN {
            subnet 192.168.1.0/24 {
                default-router 192.168.1.1
                dns-server 192.168.1.1
                domain-name internal-network
                lease 86400
                range 0 {
                    start 192.168.1.2
                    stop 192.168.1.255
                }
            }
        }
        shared-network-name MY_POOL {
            subnet 192.168.0.0/24 {
                default-router 192.168.0.1
                dns-server 192.168.0.1
                range 0 {
                    start 192.168.0.32
                    stop 192.168.0.82
                }
            }
        }
    }
    dns {
        forwarding {
            cache-size 8000
            listen-on eth1
            listen-on eth2
            name-server 114.114.114.114
            name-server 114.114.115.115
        }
    }
    ssh {
        port 22
    }
}
system {
    config-management {
        commit-revisions 20
    }
    console {
        device ttyS0 {
            speed 9600
        }
    }
    host-name vyos
    login {
        user vyos {
            authentication {
                encrypted-password $6$Yzq3eW98.Hg8$glfkAjcPeOVvk1BC90vBYD0RLRNV9yCNRLFPv3HnSLiLBKCN6dj9d5i6u4Mq7WiF3yUFDVBoUuV/0MgcXO9oT0
                plaintext-password ""
            }
            level admin
        }
    }
    name-server 223.5.5.5
    name-server 223.6.6.6
    ntp {
        server 0.pool.ntp.org {
        }
        server 1.pool.ntp.org {
        }
        server 2.pool.ntp.org {
        }
    }
    syslog {
        global {
            facility all {
                level notice
            }
            facility protocols {
                level debug
            }
        }
    }
    time-zone Asia/Shanghai
}


/* Warning: Do not remove the following line. */
/* === vyatta-config-version: "broadcast-relay@1:cluster@1:config-management@1:conntrack-sync@1:conntrack@1:dhcp-relay@1:dhcp-server@5:firewall@5:ipsec@4:mdns@1:nat@4:qos@1:quagga@3:ssh@1:system@9:vrrp@2:wanloadbalance@3:webgui@1:webproxy@1:zone-policy@1" === */
/* Release version: 1.2.0-rolling+201810310131 */
