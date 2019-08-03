import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import * as shape from 'd3-shape';
import { ApiService } from '../../../service/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    naturalCurve = shape.curveNatural;

    dataStep = [
        {
            'name': 'Germany',
            'value': 40632,
            'extra': {
                'code': 'de'
            }
        },
        {
            'name': 'United States',
            'value': 50000,
            'extra': {
                'code': 'us'
            }
        }
    ];

    dataDream = [
        {
            'name': 'United Kingdom',
            'value': 36240,
            'extra': {
                'code': 'uk'
            }
        },
        {
            'name': 'Spain',
            'value': 33000,
            'extra': {
                'code': 'es'
            }
        }
    ];

    data = [{
        'name': 'Italy',
        'series': [
            {
                'value': 6554,
                'name': '2016-09-16T10:55:59.553Z'
            },
            {
                'value': 2853,
                'name': '2016-09-13T12:19:06.349Z'
            },
            {
                'value': 6933,
                'name': '2016-09-14T21:07:03.502Z'
            },
            {
                'value': 4417,
                'name': '2016-09-20T08:03:16.803Z'
            },
            {
                'value': 3620,
                'name': '2016-09-13T02:34:46.759Z'
            },
            {
                'name': '2016-09-19T14:18:13.421Z',
                'value': 4209
            }
        ]
    },
        {
            'name': 'Latvia',
            'series': [
                {
                    'value': 3870,
                    'name': '2016-09-16T10:55:59.553Z'
                },
                {
                    'value': 2882,
                    'name': '2016-09-13T12:19:06.349Z'
                },
                {
                    'value': 5562,
                    'name': '2016-09-14T21:07:03.502Z'
                },
                {
                    'value': 3554,
                    'name': '2016-09-20T08:03:16.803Z'
                },
                {
                    'value': 5608,
                    'name': '2016-09-13T02:34:46.759Z'
                },
                {
                    'name': '2016-09-19T14:18:13.421Z',
                    'value': 5620
                }
            ]
        },
        {
            'name': 'Antigua and Barbuda',
            'series': [
                {
                    'value': 3922,
                    'name': '2016-09-16T10:55:59.553Z'
                },
                {
                    'value': 5946,
                    'name': '2016-09-13T12:19:06.349Z'
                },
                {
                    'value': 6670,
                    'name': '2016-09-14T21:07:03.502Z'
                },
                {
                    'value': 6852,
                    'name': '2016-09-20T08:03:16.803Z'
                },
                {
                    'value': 3650,
                    'name': '2016-09-13T02:34:46.759Z'
                },
                {
                    'name': '2016-09-19T14:18:13.421Z',
                    'value': 3260
                }
            ]
        },
        {
            'name': 'Serbia',
            'series': [
                {
                    'value': 5568,
                    'name': '2016-09-16T10:55:59.553Z'
                },
                {
                    'value': 2752,
                    'name': '2016-09-13T12:19:06.349Z'
                },
                {
                    'value': 2814,
                    'name': '2016-09-14T21:07:03.502Z'
                },
                {
                    'value': 6272,
                    'name': '2016-09-20T08:03:16.803Z'
                },
                {
                    'value': 2663,
                    'name': '2016-09-13T02:34:46.759Z'
                },
                {
                    'name': '2016-09-19T14:18:13.421Z',
                    'value': 6877
                }
            ]
        },
        {
            'name': 'Sint Maarten (Dutch Part)',
            'series': [
                {
                    'value': 6817,
                    'name': '2016-09-16T10:55:59.553Z'
                },
                {
                    'value': 2165,
                    'name': '2016-09-13T12:19:06.349Z'
                },
                {
                    'value': 5013,
                    'name': '2016-09-14T21:07:03.502Z'
                },
                {
                    'value': 4182,
                    'name': '2016-09-20T08:03:16.803Z'
                },
                {
                    'value': 6502,
                    'name': '2016-09-13T02:34:46.759Z'
                },
                {
                    'name': '2016-09-19T14:18:13.421Z',
                    'value': 3435
                }
            ]
        }
    ];
    pieView = [
        150, 150
    ];
    metrics$: Observable<any>;
    lineView = [
        280, 150
    ];

    today = new Date();

    constructor(
        private router: Router,
        private authService: AuthService,
        private apiService: ApiService
    ) {
    }

    ngOnInit() {
        this.metrics$ = this.apiService.getMetrics();
    }

    onLogout() {
        this.router.navigate(['/user/login']);
    }
}
